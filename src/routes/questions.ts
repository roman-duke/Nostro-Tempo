// Questions route module
import express from "express";
import { questionsController } from "../controllers/questions.js";

const questionsRoute = express.Router();

// Route endpoints
questionsRoute.get('/questions', questionsController.getQuestions);

questionsRoute.post('/questions', questionsController.createQuestion);

questionsRoute.post('/questions/checkAnswers', questionsController.checkAnswers);

questionsRoute.get('/questions/:questionId', questionsController.getQuestion);

questionsRoute.delete('/questions/:questionId', questionsController.deleteQuestion);

questionsRoute.patch('/questions/:questionId', questionsController.updateQuestion);

export { questionsRoute };
