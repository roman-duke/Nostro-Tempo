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

  getCategory: async () => {
    const data = await CategoriesRepository.findById('');
    return data;
  }
}
