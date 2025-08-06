import { query } from "../db/connection.js";
import { Question } from "../models/question.js";

export const QuestionsRepository = {
  async findAll(): Promise<Question[]> {
    const [results] = await query<Question[]>('SELECT * FROM questions');

    return results;
  },

  async findById(id: string) {
    const [results] = await query<Question[]>(
      `SELECT * FROM questions
       WHERE id = ${id};`
    );

    return results;
  },

  async create(body: Question) {
    const [results] = await query(
      `INSERT INTO questions
       (name, description, difficulty, category_id)
       VALUES (?, ?, ?);
      `,
      Object.values(body),
    );

    return results;
  },

  async update(id: string, body: Partial<Question>) {
    // Take the partial or full form of the question object
    // and then perform an update using raw sql.
    const [results] = await query(
      `UPDATE questions
       SET ${
          Object.entries(body)
                .map(val => `${val[0] = val[1]}`)
                .toString()
        }
       WHERE id = ${id};
      `
    );

    return results;
  },

  async delete(id: string) {
    await query(
      `DELETE FROM questions
       WHERE id = ${id};
      `
    );
  }
}
