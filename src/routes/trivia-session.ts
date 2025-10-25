// Trivia Session Route module
import express from "express";
import { zodBodyValidator } from "../middleware/validationMiddleware";
import { createTriviaSessionSchema } from "../models/clientModels/trivia-session";
import { triviaSessionController } from "../controllers/trivia-session";

const triviaSessionRoute = express.Router();

triviaSessionRoute.post(
  "/trivia",
  zodBodyValidator(createTriviaSessionSchema),
  triviaSessionController.createTriviaSession,
);

// triviaSessionRoute.post(
//   "/trivia/grade"
// )
