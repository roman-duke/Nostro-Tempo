import { query } from "../db/connection.js";
import { AnswerChoice } from "../models/answerChoice.js";

export const AnswerChoicesRepository = {
  async findAll(): Promise<AnswerChoice[]> {
    const [results] = await query<AnswerChoice[]>('SELECT * FROM question_options');

    return results;
  },

  async findById(id: string) {
    const [results] = await query<AnswerChoice[]>(
      `SELECT * FROM answer_options
       WHERE id = ${id};
      `
    );

    return results;
  },

  async create(body: AnswerChoice) {
    const [results] = await query(
      `INSERT INTO answer_options
       (question_id, option_description)
       VALUES (?, ?);
      `,
      Object.values(body),
    )

    return results;
  },

  async delete(id: string) {
    await query(
      `DELETE FROM answer_options
       WHERE id = ${id};
      `
    )
  }

  // async update(id: string, body: Partial<AnswerChoice>) {
  //   // Take the partial or full form of the answer option object
  //   // and then perform an update using raw sql
  //   const [results] = await query(
  //     `UPDATE answer_options
  //      SET ${
  //       Object.entries
  //      }
  //     `
  //   )
  // }
}
