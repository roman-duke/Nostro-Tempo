// Questions route module
import express from "express";
import { questionsController } from "../controllers/questions.js";
import {
  zodBodyValidator,
  zodIdValidator,
  zodQueryValidator,
} from "../middleware/validationMiddleware.js";
import {
  createQuestionSchema,
  partialQuestionSchema,
  questionsQuerySchema,
} from "../models/clientModels/question.js";

const questionsRoute = express.Router();

// TODO: Have a route-bound middleware for validating the path parameters

// Route endpoints
questionsRoute.get(
  "/questions",
  zodQueryValidator(questionsQuerySchema),
  questionsController.getQuestions,
);

questionsRoute.post(
  "/questions",
  zodBodyValidator(createQuestionSchema),
  questionsController.createQuestion,
);

questionsRoute.get(
  "/questions/:questionId",
  zodIdValidator("questionId"),
  questionsController.getQuestion,
);

questionsRoute.delete(
  "/questions/:questionId",
  zodIdValidator("questionId"),
  questionsController.deleteQuestion,
);

questionsRoute.patch(
  "/questions/:questionId",
  zodIdValidator("questionId"),
  zodBodyValidator(partialQuestionSchema),
  questionsController.updateQuestion,
);

// TODO: Have a route-bound error handling middleware for default error handling

export { questionsRoute };
