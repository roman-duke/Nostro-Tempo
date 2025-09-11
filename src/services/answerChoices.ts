import { AnswerChoice } from "../models/answerChoice.js";
import { AnswerChoicesRepository } from "../repositories/answerChoices.js";
import { v4 as uuidv4 } from "uuid";

export const answerChoicesService = {
  createAnswerChoice: async (paylaod: Omit<AnswerChoice, "id">) => {
    const id = uuidv4();

    const record = {
      id,
      ...paylaod
    } as AnswerChoice;

    await AnswerChoicesRepository.create(record);

    return record;
  },

  getAllAnswerChoices: async () => {
    const data = await AnswerChoicesRepository.findAll();
    return data;
  },

  getAnswerChoice: async (id: string) => {
    const data = await AnswerChoicesRepository.findById(id);
    return data;
  },

  updateAnswerChoice: async (id: string, payload: Partial<AnswerChoice>) => {
    // await AnswerChoicesRepository.update()
  },

  deleteAnswerChoice: async (id: string) => {
    const data = await AnswerChoicesRepository.delete(id);
    return data;
  }
}
