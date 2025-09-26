import z from "zod";
import { NextFunction, Request, Response } from "express";
import { questionsService } from "../services/questions.js";
import { UserAnswer } from "../models/answerChoice.js";
import {
  CreateQuestion,
  createQuestionSchema,
  partialQuestionSchema,
} from "../models/clientModels/question.js";

export const questionsController = {
  createQuestion: async (req: Request, res: Response, next: NextFunction) => {
    // Perform the data validation using zod
    const parseResult = createQuestionSchema.safeParse(req.body);
    if (!parseResult.success) {
      return next(parseResult.error);
    }

    const payload = parseResult.data as CreateQuestion;
    const result = await questionsService.createQuestion(payload);

    // Transform the reponse to the required format for the application layer.

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

  updateQuestion: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.questionId;
    // Check if we got a valid id
    const idParseResult = z.uuidv4().safeParse(id);
    if (!idParseResult.success) {
      return next(idParseResult.error);
    }

    // Validate the request body against the partial of the Question object
    const dataParseResult = partialQuestionSchema.safeParse(req.body);

    if (!dataParseResult.success) {
      return next(dataParseResult.error);
    }

    const payload = dataParseResult.data;

    const question = await questionsService.updateQuestion(id, payload);

    res.status(201).json(question);
  },

  deleteQuestion: async (req: Request, res: Response) => {
    const id = req.params.questionId;
    await questionsService.deleteQuestion(id);

    res.status(204).send();
  },
};
