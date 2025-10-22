import { Request, Response } from "express";
import { questionsService } from "../services/questions.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { NotFoundError } from "../utils/errors.js";
import { questionClientSchema } from "../models/clientModels/question.js";

export const questionsController = {
  createQuestion: asyncHandler(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await questionsService.createQuestion(payload);

    // Format the data for the client
    const formattedData = questionClientSchema.parse(result);
    res.status(201).json(formattedData);
  }),

  getQuestions: asyncHandler(async (req: Request, res: Response) => {
    const queryParams = req.query as any;
    const questionsResult = await questionsService.getAllQuestions(queryParams);

    // Format the data for the client
    const { data, ...rest } = questionsResult;
    const formattedData = questionClientSchema.array().parse(data);

    const result = {
      data: formattedData,
      ...rest,
    };

    res.status(200).json(result);
  }),

  getQuestion: asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.questionId;
    const question = await questionsService.getQuestion(id);
    if (!question) throw new NotFoundError(`Question with id ${id} not found`);

    const clientQuestion = questionClientSchema.parse(question);

    const result = {
      data: clientQuestion,
    };

    res.status(200).json(result);
  }),

  updateQuestion: asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.questionId;
    const question = await questionsService.getQuestion(id);
    if (!question) throw new NotFoundError(`Question with id ${id} not found`);

    const payload = req.body;
    const updatedQuestion = await questionsService.updateQuestion(id, payload);

    const result = {
      data: questionClientSchema.parse(updatedQuestion),
    };

    res.status(201).json(result);
  }),

  deleteQuestion: asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.questionId;
    const question = await questionsService.getQuestion(id);
    if (!question) throw new NotFoundError(`Question with id ${id} not found`);

    await questionsService.deleteQuestion(id);

    res.status(204).send();
  }),
};
