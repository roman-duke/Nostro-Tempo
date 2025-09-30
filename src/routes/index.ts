import express, { NextFunction, Request, Response } from "express";
import { categoriesRoute } from "./categories.js";
import { questionsRoute } from "./questions.js";
import { answerChoicesRoute } from "./answerChoices.js";
// import { triviaSessionRoute } from "./triviaSession.js";
import { ValidationError } from "../utils/errors.js";

export const appRouter = express.Router();

appRouter.use("/", questionsRoute);
appRouter.use("/", categoriesRoute);
appRouter.use("/", answerChoicesRoute);
// appRouter.use("/", triviaSessionRoute);

// Default error handler
// For now, we shall have just the ValidationError type
appRouter.use(
  (err: ValidationError, _req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(err);
    }

    if (err instanceof ValidationError) {
      res.status(err.statusCode).json({
        message: err.message,
        details: err.details,
      });
      return;
    }

    res.status(500).send("Internal Server Error!");
  },
);
