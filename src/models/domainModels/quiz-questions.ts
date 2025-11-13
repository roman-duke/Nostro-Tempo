import z from "zod"

export const quizQuestionSchema = z.object({
  quizId: z.uuidv4(),
  questionSnapshotId: z.uuidv4(),
  questionSnapshotVersion: z.int(),
  questionOrder: z.int(),
});
export type QuizQuestion = z.infer<typeof quizQuestionSchema>;
