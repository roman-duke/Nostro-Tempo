import { query } from "../db/connection.js";
import { Category } from "../models/Category.js"

export const CategoriesRepository = {
  async findById(id: number): Promise<Category[] | null> {
    const [results] = await query<Category[]>('SELECT * FROM questions');

    return results;
  }
}
