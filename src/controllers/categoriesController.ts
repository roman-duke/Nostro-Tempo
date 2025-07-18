import { Request, Response } from "express";
import { categoriesService } from "../services/categoriesService.js";

export const categoriesController = {
  getCategories: (req: Request, res: Response) => {
    const categories = categoriesService.getAllCategories();
    res.status(200).json(categories);
  },

  getCategory: (req: Request, res: Response) => {
    const id = Number(req.params.categoryId);
    // const category = categorieService.getCategory(id);
  }
}
