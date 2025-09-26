import { query } from "../db/connection.js";
import { Category } from "../models/category.js";

export const CategoriesRepository = {
  async findAll(): Promise<Category[]> {
    const [results] = await query<Category[]>("SELECT * FROM categories;");

    return results;
  },

  async findById(id: string) {
    const [results] = await query<Category[]>(
      `SELECT * FROM categories
       WHERE id = ${id};`,
    );

    return results;
  },

  async create(body: Category) {
    const [results] = await query(
      `INSERT INTO categories
       (name, image, description)
       VALUES (?, ?, ?);
      `,
      Object.values(body),
    );

    return results;
  },

  async update(id: string, body: Partial<Category>) {
    // Take the partial or full form of the category object
    // and then perform an update using raw sql.
    const [results] = await query(
      `UPDATE categories
       SET ${Object.entries(body)
         .map((val) => `${(val[0] = val[1])}`)
         .toString()}
       WHERE id = ${id};
      `,
    );

    return results;
  },

  async delete(id: string) {
    const [results] = await query(
      `DELETE FROM categories
       WHERE id = ${id};
      `,
    );
  },
};
