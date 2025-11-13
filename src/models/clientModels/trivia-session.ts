import z from "zod";

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
