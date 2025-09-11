import { Question } from "../models/question.js";
import { QuestionsRepository } from "../repositories/questions.js";
import { v4 as uuidv4 } from "uuid";

export const questionsService = {
  createQuestion: async (payload: Omit<Question, "id">) => {
    const id = uuidv4();
    const record = {
      id,
      ...payload,
    } as Question;

    await QuestionsRepository.create(record);

    return record;
  },

  getAllQuestions: async () => {
    const data = await QuestionsRepository.findAll();
    return data;
  },

  getQuestion: async (id: string) => {
    const data = await QuestionsRepository.findById(id);
    return data;
  },

  updateQuestion: async (id: string, payload: Partial<Question>) => {
    await QuestionsRepository.update(id, payload);

    // Return the updated resource
    const response = await QuestionsRepository.findById(id);
    return response;
  },

  deleteQuestion: async (id: string) => {
    const data = await QuestionsRepository.delete(id);
    return data;
  },
};
