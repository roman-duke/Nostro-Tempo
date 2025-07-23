import { query } from "../db/connection.js";
import { Category } from "../models/category.js"

export const CategoriesRepository = {
  async findAll(): Promise<Category[]> {
    const [results] = await query<Category[]>('SELECT * FROM categories');

    return results;
  },

  async findById(id: string): Promise<Category[] | null> {
    const [results] = await query<Category[]>('SELECT * FROM questions');

    return results;
  },

  async create(body: Category) {
    const [results] = await query(
      `INSERT INTO categories
       (name, image, description)
       VALUES (?, ?, ?)
      `,
      Object.values(body),
    )

    console.log(results);
  }
}
