import { Request, Response } from "express";
import { categoriesService } from "../services/categories.js";

export const categoriesController = {
  getCategories: async (req: Request, res: Response) => {
    const categories = await categoriesService.getAllCategories();

    res.status(200).json(categories);
  },

  getCategory: (req: Request, res: Response) => {
    const id = Number(req.params.categoryId);
    // const category = categorieService.getCategory(id);
  }
}
