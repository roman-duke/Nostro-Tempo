import z from "zod";

// Define Schemas for the Question Model in the Business Logic Layer
export const questionSchema = z.object({
  id: z.uuidv4(),
  categoryId: z.uuidv4(),
  description: z.string(),
  createdAt: z.iso.date(),
  updatedAt: z.iso.date(),
  correctOptionId: z.uuidv4(),
  difficulty: z.enum(["HARD", "MEDIUM", "EASY"]),
});
