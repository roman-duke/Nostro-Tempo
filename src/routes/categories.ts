// Categories route module.
import express from "express"
import { categoriesController } from "../controllers/categories.js";

const categoriesRoute = express.Router();

categoriesRoute.get('/categories', categoriesController.getCategories);

categoriesRoute.post('/categories', categoriesController.createCategory);

categoriesRoute.get('/categories/:categoryId', categoriesController.getCategory);

categoriesRoute.delete('/categories/:categoryId', categoriesController.deleteCategory);

categoriesRoute.patch('/categories/:categoryId', categoriesController.updateCategory);

export  { categoriesRoute }
