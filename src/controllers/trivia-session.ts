import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { CreateTriviaSession } from "../models/clientModels/trivia-session";
import { triviaSessionService } from "../services/trivia-session";

export const triviaSessionController = {
  createTriviaSession: asyncHandler(async (req: Request, res: Response) => {
    const payload = req.body as CreateTriviaSession;
    const result = await triviaSessionService.createTriviaSession(payload);
  }),
};
