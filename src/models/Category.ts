import { RowDataPacket } from "mysql2";

export interface Category extends RowDataPacket {
  id: string,
  category_name: string,
  visits_no: number,
  created_at: string,
  updated_at: string,
}
