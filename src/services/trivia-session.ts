import { v4 as uuidv4 } from "uuid";
import { CreateTriviaSession } from "../models/clientModels/trivia-session";
import { TriviaSessionRepository } from "../repositories/trivia-session";
import { QuestionsRepository } from "../repositories/questions";
import {
  TriviaSessionQuestion,
  TriviaSessionUserAnswer,
} from "../models/domainModels/trivia-session";

export const triviaSessionService = {
  // Let us narrow our focus to creating a trivia session that is not based on a quiz.
  createTriviaSession: async (payload: CreateTriviaSession) => {
    const sessionId = uuidv4();
    const { userId, ...rest } = payload;
    const record = {
      sessionId,
      ...rest,
    };

    // First create the trivia session
    await TriviaSessionRepository.insert(record);

    // Generate a random bank of questions
    const questionsBank = await QuestionsRepository.findAll({
      limit: payload.numOfQuestions,
      filter: {
        difficulty: payload.difficultyLevel,
      },
    });

    //================== Create new records in the session_questions and session_users_answers table ===============================//
    const sessionQuestions: TriviaSessionQuestion[] = [];
    const sessionUsersAnswers: Pick<
      TriviaSessionUserAnswer,
      "userId" | "sessionId" | "questionSnapshotId" | "questionSnapshotVersion"
    >[] = [];

    // TODO: Use a more randomized strategy for question order
    questionsBank.forEach((question, idx) => {
      const sessionQuestion = {
        sessionId,
        questionSnapshotId: question.id,
        questionSnapshotVersion: question.version,
        questionOrder: idx,
      };

      sessionQuestions.push(sessionQuestion);
      sessionUsersAnswers.push({
        userId,
        ...sessionQuestion,
      });
    });

    // TODO: Create new records in the session_questions table using sessionQuestions

    // TODO: Create new records  the session_users_answers table using session_questions

    // TODO: Create a record in the session_users_summary table for this particular user
  },
};
