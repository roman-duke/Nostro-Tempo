import express from "express";
import { categoriesRoute } from "./categories.js";
import { questionsRoute } from "./questions.js";

export const appRouter = express.Router();

appRouter.use('/', categoriesRoute);
appRouter.use('/', questionsRoute);
