import { query } from "../db/connection";
import { CreateTriviaSession } from "../models/clientModels/trivia-session";

export const TriviaSessionRepository = {
  async insert(body: Omit<CreateTriviaSession, "random" | "categoryId">) {
    await query(
      `
        INSERT INTO trivia_sessions
        (id, quiz_id, num_of_questions, is_timed, expires_at)
        VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?);
      `,
      Object.values(body),
    );
  },
};
