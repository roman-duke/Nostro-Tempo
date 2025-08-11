import { Request, Response } from "express";
import { answerChoicesService } from "../services/answerChoices.js";

export const answerChoicesController = {
  createAnswerChoice: async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await answerChoicesService.createAnswerChoice(payload);

    res.status(201).json(result);
  },

  getAnswerChoices: async (req: Request, res: Response) => {
    const answerChoices = await answerChoicesService.getAllAnswerChoices();

    res.status(200).json(answerChoices);
  },

  // updateAnswerChoice: async (req: Request, res: Response) => {
  //   const id = req.params.answerChoiceId;
  //   const payload = req.body;

  //   res.status(200).json()
  // },

  deleteAnswerChoice: async (req: Request, res: Response) => {
    const id = req.params.answerChoiceId;
  },
}
