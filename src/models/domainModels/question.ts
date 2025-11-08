import z from "zod";
import { questionAnswersSchema } from "./question-answers";

// Define Schemas for the Question Model in the Business Logic Layer
export const questionSchema = z.object({
  id: z.uuidv4(),
  version: z.coerce.number(),
  name: z.string().nullable(),
  description: z.string(),
  categoryId: z.coerce.number(),
  mediaUrl: z.string().nullable(),
  mediaType: z.enum(["image", "audio", "video"]).nullable(),
  questionType: z.enum(["multiple_choice", "true_false", "fill_in_blank"]),
  difficulty: z.enum(["HARD", "MEDIUM", "EASY"]),
  timeLimitMs: z.coerce.number(),
  matchType: z.enum(["levenshtein", "fuzzy", "exact"]),
  explanationText: z.string().nullable(),
  status: z.enum(["active", "archived", "deleted", "draft"]),
  createdBy: z.uuidv4(),
  createdAt: z.date(),
  updatedAt: z.date(),
  options: questionAnswersSchema,
});

export type Question = z.infer<typeof questionSchema>;
