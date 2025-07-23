import { Request, Response } from "express";
import { categoriesService } from "../services/categories.js";

export const categoriesController = {
  createCategory: async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await categoriesService.createCategory(payload);

    res.status(201).json(result);
  },

  getCategories: async (req: Request, res: Response) => {
    const categories = await categoriesService.getAllCategories();

    res.status(200).json(categories);
  },

  getCategory: (req: Request, res: Response) => {
    const id = Number(req.params.categoryId);
    // const category = categorieService.getCategory(id);
  }
}
