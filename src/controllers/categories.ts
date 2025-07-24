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

  getCategory: async (req: Request, res: Response) => {
    const id = req.params.categoryId;
    const category = await categoriesService.getCategory(id);

    res.status(200).json(category);
  },

  updateCategory: async (req: Request, res: Response) => {
    const id = req.params.categoryId;
    const payload = req.body;
    const category = await categoriesService.updateCategory(id, payload);

    res.status(200).json(category);
  },

  deleteCategory: async (req: Request, res: Response) => {
    const id = req.params.categoryId;
    await categoriesService.deleteCategory(id);

    res.status(204);
  }
}
