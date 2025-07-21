import { CategoriesRepository } from "../repositories/categories.js";

export const categoriesService = {
  getAllCategories: async () => {
    const data = await CategoriesRepository.findAll();
    return data;
  },

  getCategory: async () => {
    const data = await CategoriesRepository.findById('');
    return data;
  }
}
