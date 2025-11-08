import { query } from "../db/connection";
import { CreateTriviaSession } from "../models/clientModels/trivia-session";
import {
  CreateTriviaSessionUserAnswer,
  TriviaSessionQuestion,
  TriviaSessionUserAnswer,
} from "../models/domainModels/trivia-session";

export const TriviaSessionRepository = {
  async insert(
    body: Omit<CreateTriviaSession, "random" | "categoryId" | "userId"> & {
      sessionId: string;
    },
  ) {
    await query(
      `
        INSERT INTO trivia_sessions
        (id, quiz_id, difficulty, num_of_questions, is_timed, expires_at)
        VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?);
      `,
      [
        body.sessionId,
        body.quizId,
        body.difficultyLevel,
        body.numOfQuestions,
        body.isTimed,
        body.expiresAt,
      ],
    );
  },

  async insertIntoSessionQuestions(records: TriviaSessionQuestion[]) {
    const rowPlaceholders = records
      .map((_) => `(UUID_TO_BIN(?), UUID_TO_BIN(?), ?)`)
      .join();

    await query(
      `
        INSERT INTO session_questions
        (session_id, question_snapshot_id, question_snapshot_version, question_order)
        VALUES ${rowPlaceholders};
      `,
    );
  },

  async insertIntoSessionUsersAnswers(
    records: CreateTriviaSessionUserAnswer[],
  ) {
    const rowPlaceholders = records
      .map(() => `(UUID_TO_BIN(?), UUID_TO_BIN(?), UUID_TO_BIN(?), ?)`)
      .join();

    await query(
      `
        INSERT INTO session_users_answers
        (session_id, user_id, question_snapshot_id, question_snapshot_version)
        VALUES ${rowPlaceholders};
      `,
    );
  },

  // async insertIntoSessionUsersSummary() {
  //   await query(
  //     `

  //     `
  //   );
  // }
};
