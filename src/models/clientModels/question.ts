import z from "zod";
import { questionSchema } from "../domainModels/question";

// Define Schemas for the Question Model in the Application Layer
const createBaseQuestionSchema = z.object({
  description: z.string(),
  difficulty: z.enum(["HARD", "MEDIUM", "EASY"]),
  questionType: z.enum(["multiple_choice", "true_false", "fill_in_blank"]),
  categoryId: z.coerce.number(),
  createdBy: z.uuidv4(),
});

const createMediaBasedQuestionSchema = z.object({
  mediaType: z.enum(["image", "audio", "video"]),
  mediaUrl: z.url(),
  ...createBaseQuestionSchema.shape,
});

const createNoMediaQuestionSchema = z.object({
  mediaType: z.literal(null),
  ...createBaseQuestionSchema.shape,
});

export const createQuestionSchema = z.discriminatedUnion("mediaType", [
  createMediaBasedQuestionSchema,
  createNoMediaQuestionSchema,
]);

export type CreateQuestion = z.infer<typeof createQuestionSchema>;

export const partialQuestionSchema = z.discriminatedUnion("questionType", [
  createMediaBasedQuestionSchema.partial(),
  createNoMediaQuestionSchema.partial(),
]);
export type PartialQuestion = z.infer<typeof partialQuestionSchema>;

// Define schemas for the query options
export const questionsQuerySchema = z.object({
  page: z.coerce.number().positive().optional().default(1),
  limit: z.coerce.number().positive().optional().default(10),
});
export type QuestionQuery = z.infer<typeof questionsQuerySchema>;

export const questionClientSchema = questionSchema.transform((data) => {
  if (data.name === null || data.name) {
    const { name, createdBy, ...rest } = data;
    return rest;
  }
});
export type QuestionClient = z.infer<typeof questionClientSchema>;
