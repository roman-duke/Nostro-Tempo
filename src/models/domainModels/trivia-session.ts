import z from "zod";

export const triviaSessionSchema = z.object({
  id: z.uuidv4(),
  quizId: z.uuidv4(),
  quizTitle: z.string(),
  isTimed: z.boolean(),
  expiresAt: z.date(),
  createdAt: z.date(),
});
export type TriviaSession = z.infer<typeof triviaSessionSchema>;

export const createTriviaSessionSchema = triviaSessionSchema.omit({
  createdAt: true,
});
export type CreateTriviaSession = z.infer<typeof createTriviaSessionSchema>;

const triviaQuizQuestionSchema = z.object({
  quizId: z.uuidv4(),
  questionSnapshotId: z.uuidv4(),
  questionSnapshotVersion: z.int(),
  questionOrder: z.int(),
});
export type TriviaSessionQuestion = z.infer<typeof triviaQuizQuestionSchema>;

const triviaSessionUserAnswerSchema = z.object({
  sessionId: z.uuidv4(),
  userId: z.uuidv4(),
  questionSnapshotId: z.uuidv4(),
  questionSnapshotVersion: z.int(),
  selectedAnswer: z.string(),
  totalScore: z.int(),
  isCorrect: z.boolean(),
  timeSpentMs: z.int(),
});
export type TriviaSessionUserAnswer = z.infer<
  typeof triviaSessionUserAnswerSchema
>;

export const createTriviaSessionUserAnswerSchema = triviaSessionUserAnswerSchema.pick({
  sessionId: true,
  userId: true,
  questionSnapshotId: true,
  questionSnapshotVersion: true,
});
export type CreateTriviaSessionUserAnswer = z.infer<typeof createTriviaSessionUserAnswerSchema>;

const sessionUsersSummarySchema = z.object({
  id: z.uuidv4(),
  sessionId: z.uuidv4(),
  userId: z.uuidv4(),
  totalScore: z.int(),
  totalQuestions: z.int(),
  correctAnswers: z.int(),
  averageTimeMs: z.int(),
  startedAt: z.date(),
  completedAt: z.date(),
  rankInSession: z.int().nullable(),
});
export type SessionUserSummary = z.infer<typeof sessionUsersSummarySchema>;

export const createSessionUsersSummarySchema = sessionUsersSummarySchema.pick({
  id: true,
  sessionId: true,
  userId: true,
  totalQuestions: true
});
export type CreateSessionUsersSummary = z.infer<typeof createSessionUsersSummarySchema>;
