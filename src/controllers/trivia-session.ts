import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { CreateTriviaSessionClient, newSessionSchema } from "../models/clientModels/trivia-session";
import { triviaSessionService } from "../services/trivia-session";
import { quizQuestionSchema } from "../models/clientModels/quiz-questions";

export const triviaSessionController = {
  createTriviaSession: asyncHandler(async (req: Request, res: Response) => {
    const payload = req.body as CreateTriviaSessionClient;
    const result = await triviaSessionService.createTriviaSession(payload);
    const transformedResult = newSessionSchema.parse(result);

    res.status(201).json(transformedResult);
  }),

  gradeTriviaSession: asyncHandler(async (req: Request, res: Response) => {
    res.status(201).json("Ore no nawa Eren Jaeger");
  })
};
