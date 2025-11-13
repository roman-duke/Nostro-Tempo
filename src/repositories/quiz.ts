import { query } from "../db/connection";
import {
  QuizQuestion,
  quizQuestionSchema,
} from "../models/domainModels/quiz-questions";
import { CreateQuiz, createQuizSchema } from "../models/sharedModels/quiz";

export const QuizRepository = {
  async insert(body: CreateQuiz & { id: string }) {
    const record = Object.values(createQuizSchema.parse(body));

    await query(
      `
        INSERT INTO quizzes
        (id, name, description, is_ad_hoc, overall_difficulty, created_by)
        VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, UUID_TO_BIN(?));
      `,
      record,
    );
  },

  async insertIntoQuizQuestions(records: QuizQuestion[]) {
    const params = quizQuestionSchema
      .array()
      .parse(records)
      .flatMap((val) => Object.values(val));

    const rowPlaceholders = records
      .map(() => "(UUID_TO_BIN(?), UUID_TO_BIN(?), ?, ?)")
      .join();

    await query(
      `
        INSERT INTO quiz_questions
        (quiz_id, question_snapshot_id, question_snapshot_version, question_order)
        VALUES ${rowPlaceholders}
      `,
      params,
    );
  },
};
