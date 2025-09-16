import { Request, Response } from "express";
import { CreateSession } from "../models/triviaSession.js";
import { triviaSessionService } from "../services/triviaSession.js";

export const triviaSessionController = {
  createSession: async (req: Request, res: Response) => {
    // data to create a new trivia session
    const payload = req.body as CreateSession;
    const result = await triviaSessionService.createSession(payload);

    res.status(201).json(result);
  },

  // gradeSession: async (req: Request, res: Response) => {

  // }
}
