import { Request, Response } from "express";

export const answerChoicesController = {
  createAnswerChoice: async (req: Request, res: Response) => {
    const payload = req.body;
    // const result = await
  },

  getAnswerChoices: async (req: Request, res: Response) => {
    // const answerChoices = await
  },

  updateAnswerChoice: async (req: Request, res: Response) => {
    const id = req.params.answerChoiceId;
    const payload = req.body;
  },

  deleteAnswerChoice: async (req: Request, res: Response) => {
    const id = req.params.answerChoiceId;
  },
}
