import z from "zod";

export const triviaSessionSchema = z.object({
  id: z.uuidv4(),
  quizId: z.uuidv4(),
  numOfQuestions: z.coerce.number(),
  isTimed: z.boolean(),
  expiresAt: z.date(),
  createdAt: z.date(),
});
export type TriviaSession = z.infer<typeof triviaSessionSchema>;

const triviaSessionQuestionSchema = z.object({
  sessionId: z.uuidv4(),
  questionSnapshotId: z.uuidv4(),
  questionSnapshotVersion: z.int(),
  questionOrder: z.int(),
});
export type TriviaSessionQuestion = z.infer<typeof triviaSessionQuestionSchema>;

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

export type CreateTriviaSessionUserAnswer = Pick<
  TriviaSessionUserAnswer,
  "userId" | "sessionId" | "questionSnapshotId" | "questionSnapshotVersion"
>;

// const sessionUserSummarySchema = z.object({
//   id: z.uuidv4(),
//   sessionId: z.uuidv4(),
//   userId: z.uuidv4(),
//   totalScore: z.int(),
//   correctAnswers: z.int(),
//   averageTimeMs: z.int(),
//   startedAt: z.date(),
//   completedAt: z.date(),
//   rankInSession: z.int().nullable(),
// })
