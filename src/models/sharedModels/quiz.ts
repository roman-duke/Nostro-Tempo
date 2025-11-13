import z from "zod";

export const createQuizSchema = z.object({
  id: z.uuidv4(),
  name: z.string(),
  description: z.string(),
  isAdHoc: z.boolean(),
  overallDifficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  createdBy: z.uuidv4(),
})
export type CreateQuiz = z.infer<typeof createQuizSchema>;
