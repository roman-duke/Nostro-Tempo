import { CreateSession } from "../models/triviaSession.js";
import { v4 as uuidv4 } from "uuid";
import { TriviaSessionRepository } from "../repositories/triviaSession.js";
import { QuestionsRepository } from "../repositories/questions.js";

export const triviaSessionService = {
  createSession: async (data: Omit<CreateSession, "id">) => {
    // First, build the sql constraints based off user-pass parameters
    // and retrieve the questions from the database.
    let sqlConstraints = 'WHERE TRUE';
    const params = [];

    console.log(data);

    if (data.categories?.length) {
      const placeholders = data.categories.map(() => '?').join(',');
      sqlConstraints += ` AND category_id IN (${placeholders}) `
      params.push(...data.categories);
    }

    if (data.difficultyLevels?.length) {
      const placeholders = data.difficultyLevels.map(() => '?').join(',');
      sqlConstraints += ` AND difficulty IN (${data.difficultyLevels.join(',')}) `
      params.push(...data.difficultyLevels);
    }

    // Constrain by user_id
    // sqlConstraints += ` AND  user_id = UUID_TO_BIN(?) `;
    // params.push(data.userId);

    // Add limit based on questionSize parameter
    sqlConstraints +=  ` LIMIT ?`
    params.push(data.questionsSize);

    // Make the call to the db to get questions for this new trivia session
    const sessionQuestions = await QuestionsRepository.findAll(sqlConstraints, params);

    //========= Then create the trivia session and trivia_session_questions ===========//
    const triviaSessionId = uuidv4();
    const record = {
      id: triviaSessionId,
      userId: data.userId
    };

    const triviaQuestions = sessionQuestions.map((val) => (
      {
        questionId: val.id,
        sessionId: triviaSessionId
      }
    ));

    // Create the trivia session
    await TriviaSessionRepository.create(record);

    // Link the questions to the just created session
    await TriviaSessionRepository.createSessionQuestions(triviaQuestions);

    return record;
  }
}
