import {
  CreateQuestion,
  QuestionQuery,
} from "../models/clientModels/question";
import { Question } from "../models/domainModels/question";
import { QuestionsRepository } from "../repositories/questions";
import { v4 as uuidv4 } from "uuid";
import { Pagination } from "../types/index";

export const questionsService = {
  createQuestion: async (payload: CreateQuestion) => {
    const id = uuidv4();
    const record = {
      id,
      ...payload,
    };

    // Insert into the db
    await QuestionsRepository.insert(record);

    // Return the full row from the db.
    const result = await QuestionsRepository.findById(id);

    return result;
  },

  getAllQuestions: async (queryParams: QuestionQuery) => {
    const { limit, filter } = queryParams;
    const totalQuestions = await QuestionsRepository.countAll();

    const pagesCount = Math.ceil(totalQuestions / limit);
    if (queryParams.page > pagesCount) {
      queryParams.page = pagesCount;
    }

    const offset = (queryParams.page - 1) * limit;

    const data = await QuestionsRepository.findAll({ limit, offset, filter });

    return {
      data,
      meta: {
        total: totalQuestions,
        page: queryParams.page,
        limit,
        totalPages: pagesCount,
      } as Pagination,
    };
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

  countQuestions: async () => {
    const total = await QuestionsRepository.countAll();
    return total;
  },
};
