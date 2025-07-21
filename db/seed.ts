import * as mysql from "mysql2";
import { readFileSync } from "fs";
import "dotenv/config";
import { questions, categories } from "./mock.js";

// Read SQL init query
const initQueries = readFileSync("./db/init.sql", {
  encoding: "utf-8",
})
  .toString()
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
  .replace(/(\r\n|\n|\r)/gm, " ") // remove new lines
  .replace(/\s+/g, " ") // excess white space
  .split(";") // split into all statements
  .map((s) => s.trim()) // trim
  .filter((query) => query.length != 0); // remove any empty queries;

// Connect to database
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

async function createSchema() {
  console.log("Creating database schema for ruday...");

  initQueries.forEach(function (initQuery) {
    db.query(initQuery, (err: mysql.QueryError | null, result) => {
      if (err) throw err;
    });
  });
}

async function seedTables() {
  // Seed the categories table first, since there's a foreign key in questions that references it
  console.log("Running SQL seed...");
  seedQueries.forEach(function (seedQuery, idx) {
    if (idx == 1) {
      categories.map((category) => {
        db.query(
          seedQuery,
          Object.values(category),
          (err: mysql.QueryError | null) => {
            if (err) throw err;
          }
        );
      });
    } else if (idx == 2) {
      questions.map((question) => {
        db.query(
          seedQuery,
          Object.values(question),
          (err: mysql.QueryError | null) => {
            if (err) throw err;
          }
        );
      });
    } else {
      db.query(seedQuery, (err) => {
        if (err) throw err;
      });
    }
  });
}

// Leveraging an IIFE since in most versions of Javascript, a top level await is not valid syntax
(async function () {
  await createSchema();
  await seedTables()
    .then(() => console.log("Tables successfully seeded."))
    .then(() => process.exit());
})();
