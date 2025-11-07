import z from "zod"

export const questionAnswersSchema = z.object({
  id: z.uuidv4(),
  version: z.int(),
  // questionId: z.uuidv4(),
  answerText: z.string(),
  isCorrect: z.coerce.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
