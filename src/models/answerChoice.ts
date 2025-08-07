import { RowDataPacket } from "mysql2";

export interface AnswerChoice extends RowDataPacket {
  id: string,
  question_id: string;
  option_description: string;
  created_at?: string;
  updated_at?: string;
}
