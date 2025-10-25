import { uuidv4 } from "zod";
import { CreateTriviaSession } from "../models/clientModels/trivia-session";
import { TriviaSessionRepository } from "../repositories/trivia-session";

export const triviaSessionService = {
  // Let us narrow our focus to creating a trivia session that is not based on a quiz.
  createTriviaSession: async (payload: CreateTriviaSession) => {
    const id = uuidv4();
    const { quizId, difficultyLevel, numOfQuestions, isTimed, expiresAt } = payload;
    const record = {
      id,
      quizId,
      difficultyLevel,
      numOfQuestions,
      isTimed,
      expiresAt,
    };

    // We shall spit out
    TriviaSessionRepository.insert(record);
  },
};
