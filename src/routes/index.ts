import express from "express";
import { categoriesRoute } from "./categories.js";
import { questionsRoute } from "./questions.js";
import { answerChoicesRoute } from "./answerChoices.js";
import { triviaSessionRoute } from "./triviaSession.js";

export const appRouter = express.Router();

appRouter.use('/', questionsRoute);
appRouter.use('/', categoriesRoute);
appRouter.use('/', answerChoicesRoute);
appRouter.use('/', triviaSessionRoute);
