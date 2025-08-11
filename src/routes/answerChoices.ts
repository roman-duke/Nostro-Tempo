import express from "express"
import { answerChoicesController } from "../controllers/answerChoices.js";

const answerChoicesRoute = express.Router();

answerChoicesRoute.get('/answerChoices', answerChoicesController.getAnswerChoices);

answerChoicesRoute.post('/answerChoices', answerChoicesController.createAnswerChoice);

// answerChoicesRoute.put('/answerChoices/:answerChoiceId');

answerChoicesRoute.delete('/answerChoices/:answerChoiceId', answerChoicesController.deleteAnswerChoice);

export { answerChoicesRoute }
