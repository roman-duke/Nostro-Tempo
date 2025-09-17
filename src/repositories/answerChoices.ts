import { query } from "../db/connection.js";
import { AnswerChoice } from "../models/answerChoice.js";

export const AnswerChoicesRepository = {
  async findAll(sqlConstraints?: string, params?: (string | number)[]): Promise<AnswerChoice[]> {
    let sql = `
      SELECT
        BIN_TO_UUID(id) AS id,
        BIN_TO_UUID(question_id) AS question_id,
        option_description,
        created_at,
        updated_at
      FROM question_options
    `;

    sql += `${sqlConstraints}`;

    const [results] = await query<AnswerChoice[]>(sql, params);

    return results;
  },

  async findById(id: string) {
    const [results] = await query<AnswerChoice[]>(
      `SELECT * FROM question_options
       WHERE id = ${id};
      `
    );

    return results;
  },

  async create(body: AnswerChoice) {
    await query(
      `INSERT INTO question_options
       (id, question_id, option_description)
       VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?), ?);
      `,
      Object.values(body),
    );

    return body.id;
  },

  async delete(id: string) {
    await query(
      `DELETE FROM question_options
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
