import z from "zod";
import { questionClientSchema, questionWithOptionsSchema } from "./question";
import { questionSchema } from "../domainModels/question";
import { questionAnswersSchema } from "../domainModels/question-answers";

// TODO: See if you can workaround the loss of the shape and extend methods
export const quizQuestionSchema = z
  .object({
    ...questionWithOptionsSchema.shape,
    questionOrder: z.int(),
  })
  .transform((data) => {
    if (data.name === null || data.name) {
      const { name, createdBy, status, ...rest } = data;
      return rest;
    }
  });

export type QuizQuestionsClient = z.infer<typeof quizQuestionSchema>;
