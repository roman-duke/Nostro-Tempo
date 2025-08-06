import { Question } from "../models/question.js";
import { QuestionsRepository } from "../repositories/questions.js";

export const questionsService = {
  createQuestion: async (payload: Question) => {
    const data = await QuestionsRepository.create(payload);
    return data;
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
    const data = await QuestionsRepository.update(id, payload);
    return data;
  },

  deleteQuestion: async (id: string) => {
    const data = await QuestionsRepository.delete(id);
    return data;
  }
}
