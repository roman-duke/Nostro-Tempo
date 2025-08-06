import { RowDataPacket } from "mysql2";

export interface Question extends RowDataPacket {
  id: string,
  category_id: string,
  description: string,
  difficulty: "HARD" | "MEDIUM" | "EASY",
  correct_option_id: string,
  created_at: string,
  updated_at: string,
}

interface QuestionOption {
  id: string,
  question_id: string
}
