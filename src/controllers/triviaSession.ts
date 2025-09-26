import { Request, Response } from "express";
import { CreateSession, SessionAnswer } from "../models/triviaSession.js";
import { triviaSessionService } from "../services/triviaSession.js";

export const triviaSessionController = {
  createSession: async (req: Request, res: Response) => {
    // data to create a new trivia session
    const payload = req.body as CreateSession;
    const result = await triviaSessionService.createSession(payload);

    res.status(201).json(result);
  },

  gradeSession: async (req: Request, res: Response) => {
    const payload = req.body as SessionAnswer;

    // Perform the necessary zod validation at this layer (Do not trust input from external source)
    const result = await triviaSessionService.gradeSession(payload);

    // res.status(201).json()
  },
};
