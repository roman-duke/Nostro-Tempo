import { Request, Response } from "express";
import { questionsService } from "../services/questions.js";

export const questionsController = {
  createQuestion: async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await questionsService.createQuestion(payload);

    res.status(201).json(result);
  },

  getQuestions: async (req: Request, res: Response) => {
    const questions = await questionsService.getAllQuestions();

    res.status(200).json(questions);
  },

  getQuestion: async (req: Request, res: Response) => {
    const id = req.params.questionId;
    const question = await questionsService.getQuestion(id);

    res.status(200).json(question);
  },

  updateQuestion: async (req: Request, res: Response) => {
    const id = req.params.questionId;
    const payload = req.body;
    const question = await questionsService.updateQuestion(id, payload);

    res.status(201).json(question);
  },

  deleteQuestion: async (req: Request, res: Response) => {
    const id = req.params.questionId;
    await questionsService.deleteQuestion(id);

    res.status(204);
  }
}
