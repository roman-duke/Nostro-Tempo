import z from "zod";
import { questionSchema } from "../domainModels/question.js";

// Define Schemas for the Question Model in the Application Layer
export const createQuestionSchema = z.object({
  name: z.string(),
  description: z.string(),
  difficulty: z.enum(["HARD", "MEDIUM", "EASY"]),
  categoryId: z.coerce.number(),
});

export const partialQuestionSchema = createQuestionSchema.partial();

export type CreateQuestion = z.infer<typeof createQuestionSchema>;

export type PartialQuestion = z.infer<typeof partialQuestionSchema>;

// Define schemas for the query options
export const questionsQuerySchema = z.object({
  page: z.coerce.number().positive().optional().default(1),
  limit: z.coerce.number().positive().optional().default(10),
});

export type QuestionQuery = z.infer<typeof questionsQuerySchema>;

export const questionClientSchema = questionSchema.transform((data) => {
  if (data.correctOptionId === null || data.correctOptionId) {
    const { correctOptionId, ...rest } = data;
    return rest;
  }
});

export type QuestionClient = z.infer<typeof questionClientSchema>;
