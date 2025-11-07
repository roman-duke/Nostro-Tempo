import { questionAnswersSchema } from "../domainModels/question-answers";

export const questionAnswersClientSchema = questionAnswersSchema.transform(
  (data) => {
    if (data.isCorrect !== null) {
      const { isCorrect, ...rest } = data;
      return rest;
    }
  },
);
