import z from "zod";

const baseTriviaSessionSchema = z.object({
  userId: z.uuidv4(),
  //------ We shall leave this as null for the time being -------//
  quizId: z.literal(null),
  //-------------------------------------------------------------//
  numOfQuestions: z.coerce.number(),
  difficultyLevel: z.enum(["EASY", "MEDIUM", "HARD"]),
  categoryId: z.int().nullable(),
  random: z.boolean(),
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

export const createTriviaSessionSchema = z.discriminatedUnion("isTimed", [
  createTimedTriviaSessionSchema,
  createUntimedTriviaSessionSchema,
]);

export type CreateTriviaSession = z.infer<typeof createTriviaSessionSchema>;
