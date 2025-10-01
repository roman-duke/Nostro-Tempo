import { Request, Response } from "express";
import { questionsService } from "../services/questions.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { NotFoundError } from "../utils/errors.js";

export const questionsController = {
  createQuestion: asyncHandler(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await questionsService.createQuestion(payload);

    // TODO: Transform the reponse to the required format for the application layer
    // then send that result to the user
    res.status(201).json(result);
  }),

  getQuestions: asyncHandler(async (req: Request, res: Response) => {
    const queryParams = req.query as any;
    const questions = await questionsService.getAllQuestions(queryParams);

    res.status(200).json(questions);
  }),

  getQuestion: asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.questionId;
    const question = await questionsService.getQuestion(id);
    if (!question) throw new NotFoundError(`Question with id ${id} not found`);

    res.status(200).json(question);
  }),

  updateQuestion: asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.questionId;
    const question = await questionsService.getQuestion(id);
    if (!question) throw new NotFoundError(`Question with id ${id} not found`);

    const payload = req.body;
    const updatedQuestion = await questionsService.updateQuestion(id, payload);

    res.status(201).json(updatedQuestion);
  }),

  deleteQuestion: asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.questionId;
    const question = await questionsService.getQuestion(id);
    if (!question) throw new NotFoundError(`Question with id ${id} not found`);

    await questionsService.deleteQuestion(id);

    res.status(204).send();
  }),
};
