import { RowDataPacket } from "mysql2";

export interface AnswerChoice extends RowDataPacket {
  id: string,
  questionId: string;
  optionDescription: string;
  createdAt?: string;
  updatedAt?: string;
}
