// Questions route module
import express from "express";
import { questionsController } from "../controllers/questions";
import {
  zodBodyValidator,
  zodIdValidator,
  zodQueryValidator,
} from "../middleware/validationMiddleware";
import {
  createQuestionSchema,
  partialQuestionSchema,
  questionsQuerySchema,
} from "../models/clientModels/question";

const questionsRoute = express.Router();

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

export { questionsRoute };
