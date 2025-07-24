import { Category } from "../models/category.js";
import { CategoriesRepository } from "../repositories/categories.js";

export const categoriesService = {
  createCategory: async (payload: Category) => {
    const data = await CategoriesRepository.create(payload);
    return data;
  },

  getAllCategories: async () => {
    const data = await CategoriesRepository.findAll();
    return data;
  },

  getCategory: async (id: string) => {
    const data = await CategoriesRepository.findById(id);
    return data;
  },

  updateCategory: async (id: string, payload: Partial<Category>) => {
    const data = await CategoriesRepository.update(id, payload);
    return data;
  },

  deleteCategory: async (id: string) => {
    const data = await CategoriesRepository.delete(id);
    return data;
  }
}
