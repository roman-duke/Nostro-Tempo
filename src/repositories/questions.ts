import { RowDataPacket } from "mysql2";
import { query } from "../db/connection";
import { CreateQuestion, QuestionQuery } from "../models/clientModels/question";
import { Question } from "../models/domainModels/question";
import camelToSnakeCase, {
  remapKeysToCamel,
  snakeToCamel,
} from "../utils/variableUtils";
import { DbCount } from "../types/index";
import { queryFilterBuilder } from "../utils/buildQueryParams";
import relationsBuilder from "../utils/relationsGenerator";

type QuestioRepositoryModel = Question & RowDataPacket;

export const QuestionsRepository = {
  async findAll({
    limit,
    offset = 0,
    filter,
  }: {
    limit: number;
    offset?: number;
    filter?: QuestionQuery["filter"];
  }): Promise<Question[]> {
    const { filterClause, filterParams } = queryFilterBuilder({ filterObj: filter });

    let sql = `
      SELECT
        BIN_TO_UUID(q.id) AS id,
        q.version AS version,
        category_id,
        name,
        description,
        media_url,
        media_type,
        question_type,
        difficulty,
        match_type,
        time_limit_ms,
        explanation_text,
        status,
        BIN_TO_UUID(created_by) AS created_by,
        q.created_at,
        q.updated_at,
        BIN_TO_UUID(qa.id) AS question_answers_id,
        qa.version AS question_answers_version,
        qa.answer_text AS question_answers_answer_text,
        qa.is_correct AS question_answers_is_correct,
        qa.created_at AS question_answers_created_at,
        qa.updated_at AS question_answers_updated_at
      FROM (
        SELECT DISTINCT questions.id
        FROM questions
        INNER JOIN question_answers
              ON questions.id = question_answers.question_id
        ${filterClause}
        LIMIT ${limit} OFFSET ${offset}
      ) AS limited
      INNER JOIN questions q ON q.id = limited.id
      INNER JOIN question_answers qa
            ON q.id = qa.question_id
    `;

    // TODO: Contemplate if validation of the data received from the db
    // is necessary in the short term. It has been excluded for now.
    //============================ CODE SMELL ============================//
    const [results] = await query<QuestioRepositoryModel[]>(sql, filterParams);

    const aggregatedResults = relationsBuilder(results, 'question_answers', 'options');
    const transformedResults = (aggregatedResults as Question[]).map(remapKeysToCamel);
    return transformedResults as Question[];
    //====================================================================//
  },

  async findById(id: string) {
    const [results] = await query<QuestioRepositoryModel[]>(
      `SELECT
        BIN_TO_UUID(q.id) AS id,
        q.version AS version,
        category_id,
        name,
        description,
        media_url,
        media_type,
        question_type,
        difficulty,
        match_type,
        time_limit_ms,
        explanation_text,
        status,
        BIN_TO_UUID(created_by) AS created_by,
        q.created_at,
        q.updated_at,
        BIN_TO_UUID(qa.id) AS question_answers_id,
        qa.version AS question_answers_version,
        qa.answer_text AS question_answers_answer_text,
        qa.is_correct AS question_answers_is_correct,
        qa.created_at AS question_answers_created_at,
        qa.updated_at AS question_answers_updated_at
       FROM questions q
       INNER JOIN question_answers qa
              ON q.id = qa.question_id
       WHERE q.id = UUID_TO_BIN('${id}');`,
    );

    const aggregatedResults = relationsBuilder(results, 'question_answers', 'options');
    const transformedResults = (aggregatedResults).map(remapKeysToCamel) as Question[];
    return transformedResults[0];
  },

  async insert(body: CreateQuestion & { id: string }) {
    // To cater for the two different kinds of CreateQuestion Schema
    if (body.mediaType !== null) {
      await query(
        `INSERT INTO questions
         (id, description, difficulty, question_type, category_id, created_by, media_type, media_url, match_type, time_limit_ms, explanation_text)
         VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `,
        Object.values(body),
      );
    } else {
      await query(
        `INSERT INTO questions
         (id, description, difficulty, question_type, category_id, created_by, media_type, match_type, time_limit_ms, explanation_text)
         VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, UUID_TO_BIN(?), ?, ?, ?, ?);
        `,
        Object.values(body),
      );
    }

    return body.id;
  },

  async insertIntoQuestionSnapshot(body: Question) {
    await query(
      `INSERT INTO questions_snapshots
      (id, category_id, name, description, media_url, media_type, question_type, difficulty, time_limit_ms, match_type, explanation_text, created_at)
      VALUES ()
      `
    )
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
