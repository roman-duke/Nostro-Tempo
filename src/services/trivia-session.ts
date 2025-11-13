import { v4 as uuidv4 } from "uuid";
import { CreateTriviaSessionClient } from "../models/clientModels/trivia-session";
import { TriviaSessionRepository } from "../repositories/trivia-session";
import { QuestionsRepository } from "../repositories/questions";
import {
  TriviaSessionQuestion,
  TriviaSessionUserAnswer,
} from "../models/domainModels/trivia-session";
import { QuizRepository } from "../repositories/quiz";
import { CategoriesRepository } from "../repositories/categories";

export const triviaSessionService = {
  // All trivia sessions are based on quizzes, so we have two scenarios
  // Scenario 1: It is a based on an Ad-Hoc quiz (quiz created on the fly).
  // Scenario 2: It is based on a pre-existing quiz.
  createTriviaSession: async (payload: CreateTriviaSessionClient) => {
    const sessionId = uuidv4();
    const { userId = "a8f9856f-6232-410e-a29b-c64b79c5ff84", quizId, categoryIds, difficultyLevel, expiresAt="2025-11-13T14:05:59.248Z", ...rest } = payload;

    // First we need to fetch the categories that questions should be retrieved from
    const categories = await CategoriesRepository.findAll({ categoryIds });
    const categoryNames = categories.map((val) => val.name);

    //=================== Scenario for ad-hoc quiz (where a quiz and related questions are created on the fly) =====================//
    if (!quizId) {
      const validQuizId = uuidv4();
      const description = generateQuizDescription(
        categoryNames,
        difficultyLevel,
      );
      const name = `Practice Quiz: ${categoryNames.join(" + ")} (${payload.difficultyLevel || "HARD"})`;

      const adHocQuiz = {
        id: validQuizId,
        name,
        description,
        isAdHoc: true,
        overallDifficulty: "EASY",
        createdBy: userId,
      } as const;

      // Generate an ad-hoc quiz
      await QuizRepository.insert(adHocQuiz);

      // Get a random bank of questions
      const questionsBank = await QuestionsRepository.findAll({
        limit: payload.numOfQuestions || 10,
        filter: {
          difficulty: payload.difficultyLevel || "EASY",
          category_id: categoryIds || [1, 2, 3],
        },
      });

      // Insert into quiz_questions
      // Create new records in the quiz_questions and session_users_answers table
      const quizQuestions: TriviaSessionQuestion[] = [];
      const sessionUsersAnswers: Pick<
        TriviaSessionUserAnswer,
        | "userId"
        | "sessionId"
        | "questionSnapshotId"
        | "questionSnapshotVersion"
      >[] = [];

      // TODO: Use a more randomized strategy for question order
      questionsBank.forEach((question, idx) => {
        const quizQuestion = {
          quizId: quizId || validQuizId,
          questionSnapshotId: question.id,
          questionSnapshotVersion: question.version,
          questionOrder: idx,
        };

        quizQuestions.push(quizQuestion);
        sessionUsersAnswers.push({
          sessionId,
          userId,
          questionSnapshotId: quizQuestion.questionSnapshotId,
          questionSnapshotVersion: quizQuestion.questionSnapshotVersion,
        });
      });

      // console.log(quizQuestions);
      // console.log(sessionUsersAnswers);
      // console.log(questionsBank);

      // Create the trivia session
      const triviaSessionRecord = {
        id: sessionId,
        quizId: validQuizId,
        quizTitle: name,
        isTimed: rest.isTimed || false,
        expiresAt: new Date(expiresAt as string),
      };
      await TriviaSessionRepository.insert(triviaSessionRecord);

      //====================================================//
      // TODO: Create new records in the quiz_questions table
      await QuizRepository.insertIntoQuizQuestions(quizQuestions)
      //====================================================//

      // Create new records in the session_users_answers table
      await TriviaSessionRepository.insertIntoSessionUsersAnswers(sessionUsersAnswers);

      //====================================================//
      // TODO: Create a record in the session_users_summary table for this particular user
      const sessionUserSummaryRecord = {
        id: uuidv4(),
        sessionId,
        userId,
        totalQuestions: rest.numOfQuestions || 10,
      }
      await TriviaSessionRepository.insertIntoSessionUsersSummary(sessionUserSummaryRecord);
      //====================================================//

      // Add the question order to the questions retrieved.
      return questionsBank.map((val, idx) => {
        let transformedVal = {};

        if (val.id === quizQuestions[idx].questionSnapshotId) {
          transformedVal = {
            ...val,
            questionOrder: quizQuestions[idx].questionOrder
          }

          return transformedVal;
        }
      });
    }
  },
};

function generateQuizDescription(
  selectedCategories: string[],
  difficulty: "EASY" | "MEDIUM" | "HARD",
) {
  const descriptionTemplates = [
    "Sharpen your skills in {categories} with tihs {difficulty}-level practice quiz.",
    "Test your knowledge of {categories}! Difficulty: {difficulty}.",
    "A {difficulty}-level session focused on {categories} to improve your mastery.",
  ];

  // Pick random template
  const template =
    descriptionTemplates[
      Math.floor(Math.random() * descriptionTemplates.length)
    ];

  // Format in human readable style.
  const categoriesText = selectedCategories.join(", ");

  // Replace placeholders
  const description = template
    .replace("{categories}", categoriesText)
    .replace("{difficulty}", difficulty);

  return description;
}
