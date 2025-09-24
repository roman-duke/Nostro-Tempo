// Questions route module
import express from "express";
import { questionsController } from "../controllers/questions.js";

const questionsRoute = express.Router();

// TODO: Have a route-bound middleware for validating the path parameters

// Route endpoints
questionsRoute.get('/questions', questionsController.getQuestions);

questionsRoute.post('/questions', questionsController.createQuestion);

questionsRoute.get('/questions/:questionId', questionsController.getQuestion);

questionsRoute.delete('/questions/:questionId', questionsController.deleteQuestion);

questionsRoute.patch('/questions/:questionId', questionsController.updateQuestion);

// TODO: Have a route-bound error handling middleware for default error handling

export { questionsRoute };
