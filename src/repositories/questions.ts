import { query } from "../db/connection.js";
import { Question } from "../models/question.js";
import camelToSnakeCase from "../utils/variableUtils.js";

export const QuestionsRepository = {
  async findAll(sqlConstraints?: string, params?: (string | number)[]): Promise<Question[]> {
    let sql = `
      SELECT
        BIN_TO_UUID(id) AS id,
        IF(correct_option_id IS NOT NULL, BIN_TO_UUID(correct_option_id), null) AS correct_option_id,
        name,
        description,
        difficulty,
        category_id,
        created_at,
        updated_at
      FROM questions
    `;

    sql += `${sqlConstraints};`

    const [results] = await query<Question[]>(sql, params);

    return results;
  },

  async findById(id: string) {
    const [results] = await query<Question[]>(
      `SELECT
        BIN_TO_UUID(id) AS id,
        IF(correct_option_id IS NOT NULL, BIN_TO_UUID(correct_option_id), null) AS correct_option_id,
        name,
        description,
        difficulty,
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

    // Transform from camelCase to snake_case where necessary.
    const [results] = await query(
      `UPDATE questions
       SET ${Object.entries(body)
         .map((val) => `${camelToSnakeCase(val[0])} = UUID_TO_BIN('${val[1]}')`)
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
