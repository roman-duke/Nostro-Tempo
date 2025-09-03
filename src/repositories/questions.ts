import { query } from "../db/connection.js";
import { Question } from "../models/question.js";

export const QuestionsRepository = {
  async findAll(): Promise<Question[]> {
    const [results] = await query<Question[]>(`
      SELECT BIN_TO_UUID(id) AS
        id,
        name,
        description,
        difficulty,
        correct_option_id,
        category_id,
        created_at,
        updated_at
      FROM questions;
    `);

    return results;
  },

  async findById(id: string) {
    const [results] = await query<Question[]>(
      `SELECT BIN_TO_UUID(id) AS
        id,
        name,
        description,
        difficulty,
        correct_option_id,
        category_id,
        created_at,
        updated_at
       FROM questions
       WHERE id = UUID_TO_BIN('${id}');`
    );

    return results;
  },

  async create(body: Question) {
    await query(
      `INSERT INTO questions
       (id, name, description, difficulty, category_id)
       VALUES (UUID_TO_BIN(?), ?, ?, ?, ?);
      `,
      Object.values(body),
    );

    return body.id;
  },

  async update(id: string, body: Partial<Question>) {
    // Take the partial or full form of the question object
    // and then perform an update using raw sql.
    const [results] = await query(
      `UPDATE questions
       SET ${Object.entries(body)
         .map((val) => `${val[0]} = "${val[1]}"`)
         .toString()}
       WHERE id = UUID_TO_BIN('${id}');
      `
    );

    return results;
  },

  async delete(id: string) {
    await query(
      `DELETE FROM questions
       WHERE id = UUID_TO_BIN('${id}');
      `
    );
  }
}
