import z from "zod";
import { quizQuestionSchema } from "./quiz-questions";

const baseTriviaSessionSchema = z.object({
  id: z.uuidv4(),
  userId: z.uuidv4(),
  //------ We shall leave this as null for the time being -------//
  quizId: z.uuidv4().nullable(),
  //-------------------------------------------------------------//
  numOfQuestions: z.coerce.number(),
  difficultyLevel: z.enum(["EASY", "MEDIUM", "HARD"]),
  categoryIds: z.int().array(),
});

const createTimedTriviaSessionSchema = z.object({
  ...baseTriviaSessionSchema.shape,
  isTimed: z.literal(true),
  expiresAt: z.iso.date(),
});

const createUntimedTriviaSessionSchema = z.object({
  ...baseTriviaSessionSchema.shape,
  isTimed: z.literal(false),
  expiresAt: z.literal(null),
});

export const createTriviaSessionClientSchema = z.discriminatedUnion("isTimed", [
  createTimedTriviaSessionSchema,
  createUntimedTriviaSessionSchema,
]);
export type CreateTriviaSessionClient = z.infer<typeof createTriviaSessionClientSchema>;

const gradeTriviaSessionSchema = z.object({
  quizId: z.uuidv4(),
  userId: z.uuidv4(),
  sessionId: z.uuidv4(),
  userAnswers: z.object({
    questionId: z.uuidv4(),
    questionVersion: z.number(),
    selectedAnswer: z.string(),
    timeSpent: z.number(),
  }).array(),
});
export type GradeTriviaSession = z.infer<typeof gradeTriviaSessionSchema>;

export const newSessionSchema = z.object({
  sessionId: z.uuidv4(),
  quizId: z.uuidv4(),
  quizQuestions: quizQuestionSchema.array(),
});
export type NewTriviaSession = z.infer<typeof newSessionSchema>;
