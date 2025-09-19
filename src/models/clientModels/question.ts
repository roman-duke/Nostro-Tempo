import z, { uuidv4 } from "zod";

// Define Schemas for the Question Model in the Application Layer
export const newQuestionSchema = z.object({
  categoryId: z.uuidv4(),
  description: z.string(),
  difficulty: z.enum(["HARD", "MEDIUM", "EASY"]),
  correctOptionId: z.uuidv4(),
});

export type NewQuestion = z.infer<typeof newQuestionSchema>;

// export const questionClientSchema = z.object({
//   id: uuidv4(),
//   categoryId: z.uuidv4(),
//   description: z.string(),
//   difficulty: z.enum(["HARD", "MEDIUM", "EASY"]),
//   correctOptionId: z.uuidv4(),
//   createdAt: z.iso.date(),
//   updatedAt: z.iso.date(),
// });
