import z from "zod";

// Define Schemas for the Question Model in the Business Logic Layer
export const questionSchema = z.object({
  id: z.uuidv4(),
  name: z.string().nullable(),
  description: z.string(),
  categoryId: z.coerce.number(),
  mediaUrl: z.string().nullable(),
  mediaType: z.enum(["image", "audio", "video"]).nullable(),
  questionType: z.enum(["multiple_choice", "true_false", "fill_in_blank"]),
  difficulty: z.enum(["HARD", "MEDIUM", "EASY"]),
  createdBy: z.uuidv4(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Question = z.infer<typeof questionSchema>;
