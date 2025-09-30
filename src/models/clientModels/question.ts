import z from "zod";

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
// export const questionClientSchema = z.object({
//   id: uuidv4(),
//   categoryId: z.uuidv4(),
//   description: z.string(),
//   difficulty: z.enum(["HARD", "MEDIUM", "EASY"]),
//   correctOptionId: z.uuidv4(),
//   createdAt: z.iso.date(),
//   updatedAt: z.iso.date(),
// });
