import { query } from "../db/connection";
import {
  CreateSessionUsersSummary,
  createSessionUsersSummarySchema,
  CreateTriviaSession,
  createTriviaSessionSchema,
  CreateTriviaSessionUserAnswer,
  createTriviaSessionUserAnswerSchema,
} from "../models/domainModels/trivia-session";

export const TriviaSessionRepository = {
  async insert(body: CreateTriviaSession) {
    const newRecord = Object.values(createTriviaSessionSchema.parse(body));
    await query(
      `
        INSERT INTO trivia_sessions
        (id, quiz_id, quiz_title, is_timed, expires_at)
        VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?), ?, ?, ?);
      `,
      newRecord,
    );
  },

  async insertIntoSessionUsersAnswers(
    records: CreateTriviaSessionUserAnswer[],
  ) {
    const params = createTriviaSessionUserAnswerSchema
      .array()
      .parse(records)
      .flatMap((val) => Object.values(val));

    const rowPlaceholders = records
      .map(() => `(UUID_TO_BIN(?), UUID_TO_BIN(?), UUID_TO_BIN(?), ?)`)
      .join();

    await query(
      `
        INSERT INTO session_users_answers
        (session_id, user_id, question_snapshot_id, question_snapshot_version)
        VALUES ${rowPlaceholders};
      `,
      params,
    );
  },

  async insertIntoSessionUsersSummary(body: CreateSessionUsersSummary) {
    const record = Object.values(createSessionUsersSummarySchema.parse(body));

    await query(
      `
        INSERT INTO session_users_summary
        (id, session_id, user_id, total_questions)
        VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?), UUID_TO_BIN(?), ?)
      `,
      record,
    );
  },
};
