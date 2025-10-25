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
