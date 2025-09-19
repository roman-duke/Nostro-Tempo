import express, { Errback, ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { categoriesRoute } from "./categories.js";
import { questionsRoute } from "./questions.js";
import { answerChoicesRoute } from "./answerChoices.js";
import { triviaSessionRoute } from "./triviaSession.js";

export const appRouter = express.Router();

appRouter.use('/', questionsRoute);
appRouter.use('/', categoriesRoute);
appRouter.use('/', answerChoicesRoute);
appRouter.use('/', triviaSessionRoute);

// Default error handler
appRouter.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err.stack);
  res.status(500).send("Internal Server Error!");
})
