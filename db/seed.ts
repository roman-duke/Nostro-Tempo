import * as mysql from "mysql2/promise";
import { readFileSync } from "fs";
import "dotenv/config";
import { fibAnswersSeed, questionOptionsSeed, questionsSeed } from "./mock";

// Read SQL init query
const initQueries = readFileSync("./db/init.sql", {
  encoding: "utf-8",
})
  .toString()
  .replace(/--.*$/gm, "") // Remove single-line comments
  .replace(/\/\*[\s\S]*?\*\//g, "") // Remove multi-line comments
  .replace(/(\r\n|\n|\r)/gm, " ") // remove new lines
  .replace(/\s+/g, " ") // excess white space
  .split(";") // split into all statements
  .map((s) => s.trim()) // trim
  .filter((query) => query.length != 0); // remove any empty queries

// Read SQL seed query
const seedQueries = readFileSync("./db/seed.sql", {
  encoding: "utf-8",
})
  .toString()
  .replace(/--.*$/gm, "") // Remove single-line comments
  .replace(/\/\*[\s\S]*?\*\//g, "") // Remove multi-line comments
  .replace(/(\r\n|\n|\r)/gm, " ") // remove new lines
  .replace(/\s+/g, " ") // excess white space
  .split(";") // split into all statements
  .map((s) => s.trim()) // trim
  .filter((query) => query.length != 0); // remove any empty queries;

(async () => {
  // Connect to database
  const db = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
  });

  async function createSchema() {
    for (const initQuery of initQueries) {
      await db.query(initQuery);
    }

    console.log("✅ Schemas created successfully!");
  }

  async function seedStatics() {
    // Seed the static data (user and categories)
    for (let idx = 0; idx < seedQueries.length; idx++) {
      await db.query(seedQueries[idx]);

      if (idx == 1) console.log("✅ Default System user seeded.");
      else if (idx == 2) console.log("✅ Categories seeded.");
    }
  }

  async function seedQuestions() {
    const placeholders = questionsSeed
      .map(() => "(UUID_TO_BIN(?), ?, ?, ?, ?, UUID_TO_BIN(?))")
      .join(",");

    const values = questionsSeed.flatMap((val) => [
      val.id,
      val.category_id,
      val.description,
      val.question_type,
      val.difficulty,
      val.created_by,
    ]);

    await db.query(
      `
      INSERT INTO questions
      (id, category_id, description, question_type, difficulty, created_by)
      VALUES ${placeholders}
      ON DUPLICATE KEY UPDATE id=id
    `,
      values,
    );

    console.log("✅ Questions table seeded.");
  }

  async function seedQuestionOptions() {
    const placeholders = questionOptionsSeed
      .map(() => "(UUID_TO_BIN(?), UUID_TO_BIN(?), ?, ?)")
      .join(",");

    const values = questionOptionsSeed.flatMap((val) => [
      val.id,
      val.question_id,
      val.option_text,
      val.is_correct,
    ]);

    await db.query(
      `
      INSERT INTO question_options
      (id, question_id, option_text, is_correct)
      VALUES ${placeholders}
      ON DUPLICATE KEY UPDATE id=id
    `,
      values,
    );

    console.log("✅ Question Options (MCQ and True/False) table seeded.");
  }

  async function seedFibAnswers() {
    const placeholders = fibAnswersSeed
      .map(() => "(UUID_TO_BIN(?), UUID_TO_BIN(?), ?)")
      .join(",");

    const values = fibAnswersSeed.flatMap((val) => [
      val.id,
      val.question_id,
      val.answer_text,
    ]);

    await db.query(
      `
      INSERT INTO fib_answers
      (id, question_id, answer_text)
      VALUES ${placeholders}
      ON DUPLICATE KEY UPDATE id=id
    `,
      values,
    );

    console.log("✅ Fill in Blank table seeded.");
  }

  async function seed() {
    try {
      //--------- Create the tables first
      await createSchema();

      //---------- Then seed
      await seedStatics();
      await seedQuestions();
      await seedQuestionOptions();
      await seedFibAnswers();
      console.log(`\n\n
      ---------------------------
      | 🎉 All seeds completed! |
      ----------------------------
    `);
    } catch (err) {
      console.error(err);
    } finally {
      await db.end();
    }
  }

  seed();
})();
