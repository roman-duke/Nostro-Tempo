import express from "express"

const answerChoicesRoute = express.Router();

answerChoicesRoute.get('/answerChoices');

answerChoicesRoute.post('/answerChoices');

answerChoicesRoute.put('/answerChoices/:answerChoiceId');

answerChoicesRoute.delete('/answerChoices/:answerChoiceId');

export { answerChoicesRoute }
