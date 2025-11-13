import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { CreateTriviaSessionClient } from "../models/clientModels/trivia-session";
import { triviaSessionService } from "../services/trivia-session";
import { quizQuestionSchema } from "../models/clientModels/quiz-questions";

export const triviaSessionController = {
  createTriviaSession: asyncHandler(async (req: Request, res: Response) => {
    const payload = req.body as CreateTriviaSessionClient;
    const result = await triviaSessionService.createTriviaSession(payload);
    const transformedResult = quizQuestionSchema.array().parse(result);
    
    res.status(201).json(transformedResult);
  }),
};
