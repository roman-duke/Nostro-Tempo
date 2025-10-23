import express, { NextFunction, Request, Response } from "express";
import { categoriesRoute } from "./categories";
import { questionsRoute } from "./questions";
import { answerChoicesRoute } from "./answerChoices";
// import { triviaSessionRoute } from "./triviaSession.js";
import { NotFoundError, ValidationError } from "../utils/errors";

export const appRouter = express.Router();

appRouter.use("/", questionsRoute);
appRouter.use("/", categoriesRoute);
appRouter.use("/", answerChoicesRoute);
// appRouter.use("/", triviaSessionRoute);

// Default error handler
// For now, we shall have just the ValidationError type
appRouter.use(
  (
    err: ValidationError | NotFoundError,
    _req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (res.headersSent) {
      return next(err);
    }

    // TODO: Come back to update the structure of your errors
    if (err instanceof ValidationError) {
      res.status(err.statusCode).json({
        message: err.message,
        details: err.details,
      });
      return;
    } else if (err instanceof NotFoundError) {
      res.status(err.statusCode).json({
        title: "Resource not found",
        message: err.message,
      });
      return;
    }

    res.status(500).send("Internal Server Error!");
  },
);
