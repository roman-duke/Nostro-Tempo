import { UserAnswer } from "../models/answerChoice.js";
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

  checkAnswers: async (payload: UserAnswer) => {
    let score = 0;
    const max_score = payload.selectedAnswers.length;

    for (const selectedAnswer of payload.selectedAnswers) {
      // Currently a very slow apprpoach for checking answers
      // TODO: Take all the question ids from the selected answers and
      // query the db to get all the necesary questions in one fell swoop

      // Also, please use a DTO to ensure model consistency
      const question = (await questionsService.getQuestion(selectedAnswer.questionId))[0];
      if (question["correct_option_id"] == selectedAnswer.selectedAnswerId) {
        score += 1;
      }
    }

    return `You scored ${score} / ${max_score}`;
  }
};
