import { query } from "../db/connection.js";
import { CreateSession, Session } from "../models/triviaSession.js";
import camelToSnakeCase from "../utils/variableUtils.js";

export const TriviaSessionRepository = {
  async findAll(): Promise<Session[]> {
    const [results] = await query<Session[]>(`SELECT * FROM sessions;`);

    return results;
  },

  async findById(id: string) {
    const [results] = await query<Session[]>(
      `SELECT * FROM trivia_sessions;
       WHERE id = UUID_TO_BIN('${id}');
      `
    );

    return results;
  },

  async create(body: Pick<CreateSession, "id" | "userId"> & { totalScore?: number }) {
    await query(
      `INSERT INTO trivia_sessions
       (id, user_id)
       VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?));
      `,
      Object.values(body).map(val => val.toString())
    );
  },

  async update(id: string, body: Partial<Session>) {
    // Transform from camelCase to snake_case where necessary.
    const [results] = await query(
      `UPDATE trivia_sessions
       SET ${Object.entries(body)
          .map((val) => `${camelToSnakeCase(val[0])} = UUID_TO_BIN('${val[1]}')`)
          .toString()}
       WHERE id = UUID_TO_BIN('${id}');
      `
    );

    return results;
  },

  async createSessionQuestions(questions: TriviaSessionQuestion[]) {
    const records = questions.map((question) => Object.values(question))
                             .toString()
                             .split(',');

    await query(
      `INSERT INTO trivia_session_questions
       (session_id, question_id)
       VALUES ${questions.map(() => '(UUID_TO_BIN(?), UUID_TO_BIN(?))')
                         .toString()}
      `,
      records
    );
  }
}


interface TriviaSessionQuestion {
  questionId: string,
  sessionId: string,
}
