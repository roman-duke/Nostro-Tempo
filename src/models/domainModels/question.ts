import z from "zod";
import generateSchema from "../../utils/schemaGenerator.js";

// Define Schemas for the Question Model in the Business Logic Layer
export const questionSchema = z.object({
  id: z.uuidv4(),
  categoryId: z.coerce.number(),
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  correctOptionId: z.uuidv4().nullable(),
  difficulty: z.enum(["HARD", "MEDIUM", "EASY"]),
});

export type Question = z.infer<typeof questionSchema>;
