import { AnswerChoice } from "../models/answerChoice.js";
import { AnswerChoicesRepository } from "../repositories/answerChoices.js";

export const answerChoicesService = {
  createAnswerChoice: async (paylaod: AnswerChoice) => {
    const data = await AnswerChoicesRepository.create(paylaod);
    return data;
  },

  getAllAnswerChoices: async () => {
    const data = await AnswerChoicesRepository.findAll();
    return data;
  },

  getAnswerChoice: async (id: string) => {
    const data = await AnswerChoicesRepository.findById(id);
    return data;
  },

  deleteAnswerChoice: async (id: string) => {
    const data = await AnswerChoicesRepository.delete(id);
    return data;
  }
}
