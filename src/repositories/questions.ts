import { RowDataPacket } from "mysql2";
import { query } from "../db/connection.js";
import { CreateQuestion } from "../models/clientModels/question.js";
import { Question } from "../models/domainModels/question.js";
import camelToSnakeCase, {
  remapKeysToCamel,
  snakeToCamel,
} from "../utils/variableUtils.js";
import { DbCount } from "../types/index.js";

type QuestioRepositoryModel = Question & RowDataPacket;

export const QuestionsRepository = {
  async findAll(
    limit: number,
    offset: number,
    filter?: object,
  ): Promise<Question[]> {
    let sql = `
      SELECT
        BIN_TO_UUID(id) AS id,
        category_id,
        name,
        description,
        media_url,
        media_type,
        question_type,
        difficulty,
        BIN_TO_UUID(created_by) AS created_by,
        created_at,
        updated_at
      FROM questions
    `;

    // TODO: Convert the filters to the respective sql. There should ideally be a helper for this operation
    const sqlLimits = `LIMIT ${limit} OFFSET ${offset}`;
    sql += `${sqlLimits};`;

    // TODO: Contemplate if validation of the data received from the db
    // is necessary in the short term. It has been excluded for now.
    //============================ CODE SMELL ============================//
    const [results] = await query<QuestioRepositoryModel[]>(sql);

    const transformedResults = (results as Question[]).map(remapKeysToCamel);
    return transformedResults as Question[];
    //====================================================================//
  },

  async findById(id: string) {
    const [results] = await query<QuestioRepositoryModel[]>(
      `SELECT
        BIN_TO_UUID(id) AS id,
        category_id,
        name,
        description,
        media_url,
        media_type,
        question_type,
        difficulty,
        BIN_TO_UUID(created_by) AS created_by,
        created_at,
        updated_at
       FROM questions
       WHERE id = UUID_TO_BIN('${id}');`,
    );

    const transformedResults = results.map(remapKeysToCamel) as Question[];
    return transformedResults[0];
  },

  async insert(body: CreateQuestion & { id: string }) {
    // To cater for the two different kinds of CreateQuestion Schema
    if (body.mediaType !== null) {
      await query(
        `INSERT INTO questions
         (id, description, difficulty, question_type, category_id, created_by, media_type, media_url)
         VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?, ?);
        `,
        Object.values(body),
      );
    } else {
      await query(
        `INSERT INTO questions
         (id, description, difficulty, question_type, category_id, created_by, media_type)
         VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, UUID_TO_BIN(?), ?);
        `,
        Object.values(body),
      );
    }

    return body.id;
  },

  async update(id: string, body: Partial<Question>) {
    // TODO: utility function for remapping the keys of the object to snake case.

    // Take the partial or full form of the question object
    // and then perform an update using raw sql.

    // Transform from camelCase to snake_case where necessary.
    const [results] = await query(
      `UPDATE questions
       SET ${Object.entries(body)
         .map((val) => `${camelToSnakeCase(val[0])} = UUID_TO_BIN('${val[1]}')`)
         .toString()}
       WHERE id = UUID_TO_BIN('${id}');
      `,
    );

    return results;
  },

  async delete(id: string) {
    await query(
      `DELETE FROM questions
       WHERE id = UUID_TO_BIN('${id}');
      `,
    );
  },

  async countAll() {
    const [result] = await query<DbCount[]>(
      `SELECT COUNT(*) AS total FROM questions;`,
    );
    return result[0].total;
  },
};
