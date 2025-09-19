import { RowDataPacket } from "mysql2";

export interface Question extends RowDataPacket {
  id: string,
  name: string,
  categoryId: string,
  description: string,
  difficulty: "HARD" | "MEDIUM" | "EASY",
  correctOptionId: string,
  createdAt: string,
  updatedAt: string,
}

interface QuestionOption {
  id: string,
  question_id: string
}
