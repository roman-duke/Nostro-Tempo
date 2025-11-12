import { RowDataPacket } from "mysql2";

export interface Category extends RowDataPacket {
  id: string;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
