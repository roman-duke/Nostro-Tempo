import express from "express";
import { categoriesRoute } from "./categories.js";

export const appRouter = express.Router();

appRouter.use('/', categoriesRoute);
