import { RowDataPacket } from "mysql2";
import { Category } from "./category.js";

// TODO: Use zod for the typing and validation

export interface CreateSession {
  id: string,
  userId: string,
  categories: Category["id"][],
  questionsSize: number,
  difficultyLevels: ("EASY" | "MEDIUM" | "HARD")[],
}

export interface Session extends RowDataPacket {
  triviaSessionId: string,
  userId: string,
  totalScore: number,
  createdAt: string,
}
