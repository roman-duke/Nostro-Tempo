import { RowDataPacket } from "mysql2";

export interface Pagination {
  page: number;
  total: number;
  limit: number;
  totalPages: number,
}

export interface DbCount extends RowDataPacket {
  total: number;
}
