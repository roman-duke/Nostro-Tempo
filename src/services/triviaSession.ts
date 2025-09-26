import { CreateSession, SessionAnswer } from "../models/triviaSession.js";
import { v4 as uuidv4 } from "uuid";
import { TriviaSessionRepository } from "../repositories/triviaSession.js";
import { QuestionsRepository } from "../repositories/questions.js";
import { AnswerChoicesRepository } from "../repositories/answerChoices.js";

export const triviaSessionService = {
  createSession: async (data: Omit<CreateSession, "id">) => {
    // First, build the sql constraints based off user-pass parameters
    // and retrieve the questions from the database.
    let sqlConstraints = "WHERE TRUE";
    const params = [];

    if (data.categories?.length) {
      const placeholders = data.categories.map(() => "?").join(",");
      sqlConstraints += ` AND category_id IN (${placeholders}) `;
      params.push(...data.categories);
    }

    if (data.difficultyLevels?.length) {
      const placeholders = data.difficultyLevels.map(() => "?").join(",");
      sqlConstraints += ` AND difficulty IN (${data.difficultyLevels.join(",")}) `;
      params.push(...data.difficultyLevels);
    }

    // Add limit based on questionSize parameter
    sqlConstraints += ` LIMIT ?`;
    params.push(data.questionsSize);

    // Make the call to the db to get questions for this new trivia session
    const sessionQuestions = await QuestionsRepository.findAll(
      sqlConstraints,
      params,
    );

    //========= Then create the trivia session and trivia_session_questions ===========//
    const triviaSessionId = uuidv4();
    const record = {
      id: triviaSessionId,
      userId: data.userId,
    };

    const triviaQuestions = sessionQuestions.map((val) => ({
      questionId: val.id,
      sessionId: triviaSessionId,
    }));

    // Create the trivia session
    await TriviaSessionRepository.create(record);

    // Link the questions to the just created session
    await TriviaSessionRepository.createSessionQuestions(triviaQuestions);

    return sessionQuestions;
  },

  gradeSession: async (data: SessionAnswer) => {
    // First, build the sql constraints based off user-passed parameters
    // and retrieve all the answers for the questions in this session.
    let sqlConstraints = "WHERE TRUE";
    const sqlParams = [];

    const questionIds = data.sessionAnswers.map((val) => val.questionId);
    const placeholders = questionIds.map(() => "?").join(",");
    sqlConstraints += ` question_id IN (${placeholders}) `;
    sqlParams.push(...questionIds);

    // Now make the call to the database to get all the questions and their answer options
    // Use this to grade
    const questions = await QuestionsRepository.findAll(
      sqlConstraints,
      sqlParams,
    );

    // Prepare the necesary data to make the bulk updates to the trivia_session_questions table
    const sessionQuestionsUpdates = questions.map((val, idx) => ({
      questionId: val.id,
      isCorrect:
        data.sessionAnswers[idx].selectedOptionId === val.correctOptionId,
    }));

    // Make the bulk updates to the trivia_session_questions table
    await TriviaSessionRepository.updateSessionQuestions(
      data.sessionId,
      sessionQuestionsUpdates,
    );

    // Now, make the general update to the trivia_session table
    // first, count the number of correct answers
    const userTotalScore = sessionQuestionsUpdates.reduce(
      (prev, curr) => (curr.isCorrect ? prev + 1 : prev),
      0,
    );

    const sessionUpdate = {
      id: data.sessionId,
      userId: data.userId,
      totalScore: userTotalScore,
    };

    await TriviaSessionRepository.update(data.sessionId, sessionUpdate);
  },
};
