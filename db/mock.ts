import { v4 as uuidv4 } from "uuid";

// Basic Mock Questions and Question Options used to seed
// the Questions and questions options tables in the db.
interface Question {
  id: string;
  question_type: "multiple_choice" | "fill_in_blank" | "true_false";
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  category_id: number;
  created_by: string;
}

interface QuestionOptions {
  id: string;
  question_id: string;
  option_text: string | boolean;
  is_correct: boolean;
}

interface FibAnswers {
  id: string;
  question_id: string;
  answer_text: string;
}

const questions: Question[] = [
  {
    id: uuidv4(),
    category_id: 1,
    description:
      "What is the square of the hypotenuse in a right-angled triangle with sides 3 and 4?",
    question_type: "multiple_choice",
    difficulty: "EASY",
    created_by: "a8f9856f-6232-410e-a29b-c64b79c5ff84",
  },
  {
    id: uuidv4(),
    category_id: 1,
    description: "Find the derivative of x squared.",
    question_type: "fill_in_blank",
    difficulty: "EASY",
    created_by: "a8f9856f-6232-410e-a29b-c64b79c5ff84",
  },
  {
    id: uuidv4(),
    category_id: 1,
    description: "Integrate 3x^2 dx.",
    question_type: "fill_in_blank",
    difficulty: "MEDIUM",
    created_by: "a8f9856f-6232-410e-a29b-c64b79c5ff84",
  },
  {
    id: uuidv4(),
    category_id: 2,
    description:
      "Force is equal to mass multiplied by acceleration. True or False?",
    question_type: "true_false",
    difficulty: "EASY",
    created_by: "a8f9856f-6232-410e-a29b-c64b79c5ff84",
  },
  {
    id: uuidv4(),
    category_id: 2,
    description: "What is the speed of light in vacuum in m/s?",
    question_type: "fill_in_blank",
    difficulty: "MEDIUM",
    created_by: "a8f9856f-6232-410e-a29b-c64b79c5ff84",
  },
  {
    id: uuidv4(),
    category_id: 2,
    description:
      "The acceleration due to gravity on the Moon is less than that on Earth. True or False?",
    question_type: "true_false",
    difficulty: "EASY",
    created_by: "a8f9856f-6232-410e-a29b-c64b79c5ff84",
  },
  {
    id: uuidv4(),
    category_id: 3,
    description: "Which country won the FIFA World Cup in 2018?",
    question_type: "fill_in_blank",
    difficulty: "MEDIUM",
    created_by: "a8f9856f-6232-410e-a29b-c64b79c5ff84",
  },
  {
    id: uuidv4(),
    category_id: 3,
    description: "A football team fields 11 players. True or False?",
    question_type: "true_false",
    difficulty: "EASY",
    created_by: "a8f9856f-6232-410e-a29b-c64b79c5ff84",
  },
  {
    id: uuidv4(),
    category_id: 3,
    description:
      "Is a goal scored directly from a penalty kick counted? True or False?",
    question_type: "true_false",
    difficulty: "EASY",
    created_by: "a8f9856f-6232-410e-a29b-c64b79c5ff84",
  },
  {
    id: uuidv4(),
    category_id: 4,
    description: "What is the most common first move for White in chess?",
    question_type: "fill_in_blank",
    difficulty: "EASY",
    created_by: "a8f9856f-6232-410e-a29b-c64b79c5ff84",
  },
  {
    id: uuidv4(),
    category_id: 4,
    description:
      "A king trapped with 1 legal move and under attack is in checkmate.",
    question_type: "true_false",
    difficulty: "EASY",
    created_by: "a8f9856f-6232-410e-a29b-c64b79c5ff84",
  },
  {
    id: uuidv4(),
    category_id: 4,
    description: "How does a knight move on the chessboard?",
    question_type: "fill_in_blank",
    difficulty: "MEDIUM",
    created_by: "a8f9856f-6232-410e-a29b-c64b79c5ff84",
  },
  {
    id: uuidv4(),
    category_id: 5,
    description: "The average human body temperature is 37°C. True or False?",
    question_type: "true_false",
    difficulty: "EASY",
    created_by: "a8f9856f-6232-410e-a29b-c64b79c5ff84",
  },
  {
    id: uuidv4(),
    category_id: 5,
    description: "What is the chemical symbol for Sodium?",
    question_type: "fill_in_blank",
    difficulty: "MEDIUM",
    created_by: "a8f9856f-6232-410e-a29b-c64b79c5ff84",
  },
  {
    id: uuidv4(),
    category_id: 1,
    description: "What value of x satisfies this equation: x^2 + 5x + 6 = 0.",
    question_type: "fill_in_blank",
    difficulty: "HARD",
    created_by: "a8f9856f-6232-410e-a29b-c64b79c5ff84",
  },
  {
    id: uuidv4(),
    category_id: 2,
    description: "If voltage is 10V and resistance is 5Ω, find the current.",
    question_type: "fill_in_blank",
    difficulty: "MEDIUM",
    created_by: "a8f9856f-6232-410e-a29b-c64b79c5ff84",
  },
  {
    id: uuidv4(),
    category_id: 5,
    description:
      "Elements in the same column of the periodic table do not belong to the same group.",
    question_type: "true_false",
    difficulty: "EASY",
    created_by: "a8f9856f-6232-410e-a29b-c64b79c5ff84",
  },
  {
    id: uuidv4(),
    category_id: 1,
    description: "Calculate 5! (5 factorial).",
    question_type: "fill_in_blank",
    difficulty: "MEDIUM",
    created_by: "a8f9856f-6232-410e-a29b-c64b79c5ff84",
  },
  {
    id: uuidv4(),
    category_id: 2,
    description: "Energy cannot be created or destroyed, only converted.",
    question_type: "true_false",
    difficulty: "EASY",
    created_by: "a8f9856f-6232-410e-a29b-c64b79c5ff84",
  },
  {
    id: uuidv4(),
    category_id: 3,
    description:
      "A corner kick occurs when the ball crosses the goal line, last touched by a defender.",
    question_type: "true_false",
    difficulty: "EASY",
    created_by: "a8f9856f-6232-410e-a29b-c64b79c5ff84",
  },
  {
    id: uuidv4(),
    category_id: 4,
    description: "En Passant is a special pawn capture in chess.",
    question_type: "true_false",
    difficulty: "HARD",
    created_by: "a8f9856f-6232-410e-a29b-c64b79c5ff84",
  },
  {
    id: uuidv4(),
    category_id: 5,
    description: "What is the atomic number of oxygen?",
    question_type: "fill_in_blank",
    difficulty: "MEDIUM",
    created_by: "a8f9856f-6232-410e-a29b-c64b79c5ff84",
  },
  {
    id: uuidv4(),
    category_id: 1,
    description: "29 is a prime number.",
    question_type: "true_false",
    difficulty: "EASY",
    created_by: "a8f9856f-6232-410e-a29b-c64b79c5ff84",
  },
  {
    id: uuidv4(),
    category_id: 2,
    description: "Energy in a closed system is conserved. True or False?",
    question_type: "true_false",
    difficulty: "MEDIUM",
    created_by: "a8f9856f-6232-410e-a29b-c64b79c5ff84",
  },
];

// ------------------- Question Options ------------------
// For multiple_choice and true_false questions
const questionOptionsSeed: QuestionOptions[] = [
  {
    id: uuidv4(),
    question_id: questions[0].id,
    option_text: "5",
    is_correct: true,
  },
  {
    id: uuidv4(),
    question_id: questions[0].id,
    option_text: "6",
    is_correct: false,
  },
  {
    id: uuidv4(),
    question_id: questions[0].id,
    option_text: "10",
    is_correct: false,
  },
  {
    id: uuidv4(),
    question_id: questions[0].id,
    option_text: "12",
    is_correct: false,
  },
  {
    id: uuidv4(),
    question_id: questions[3].id,
    option_text: "False",
    is_correct: false,
  },
  {
    id: uuidv4(),
    question_id: questions[3].id,
    option_text: "True",
    is_correct: true,
  },
  {
    id: uuidv4(),
    question_id: questions[5].id,
    option_text: "False",
    is_correct: false,
  },
  {
    id: uuidv4(),
    question_id: questions[5].id,
    option_text: "True",
    is_correct: true,
  },
  {
    id: uuidv4(),
    question_id: questions[7].id,
    option_text: "False",
    is_correct: false,
  },
  {
    id: uuidv4(),
    question_id: questions[7].id,
    option_text: "True",
    is_correct: true,
  },
  {
    id: uuidv4(),
    question_id: questions[8].id,
    option_text: "False",
    is_correct: false,
  },
  {
    id: uuidv4(),
    question_id: questions[8].id,
    option_text: "True",
    is_correct: true,
  },
  {
    id: uuidv4(),
    question_id: questions[10].id,
    option_text: "False",
    is_correct: true,
  },
  {
    id: uuidv4(),
    question_id: questions[10].id,
    option_text: "True",
    is_correct: false,
  },
  //-------- Human body
  {
    id: uuidv4(),
    question_id: questions[12].id,
    option_text: "False",
    is_correct: true,
  },
  {
    id: uuidv4(),
    question_id: questions[12].id,
    option_text: "True",
    is_correct: false,
  },
  // ---------------
  {
    id: uuidv4(),
    question_id: questions[16].id,
    option_text: "False",
    is_correct: true,
  },
  {
    id: uuidv4(),
    question_id: questions[16].id,
    option_text: "True",
    is_correct: false,
  },
  {
    id: uuidv4(),
    question_id: questions[18].id,
    option_text: "True",
    is_correct: true,
  },
  {
    id: uuidv4(),
    question_id: questions[18].id,
    option_text: "False",
    is_correct: false,
  },
  {
    id: uuidv4(),
    question_id: questions[19].id,
    option_text: "True",
    is_correct: true,
  },
  {
    id: uuidv4(),
    question_id: questions[19].id,
    option_text: "False",
    is_correct: false,
  },
  {
    id: uuidv4(),
    question_id: questions[20].id,
    option_text: "True",
    is_correct: true,
  },
  {
    id: uuidv4(),
    question_id: questions[20].id,
    option_text: "False",
    is_correct: false,
  },
  {
    id: uuidv4(),
    question_id: questions[22].id,
    option_text: "True",
    is_correct: true,
  },
  {
    id: uuidv4(),
    question_id: questions[22].id,
    option_text: "False",
    is_correct: false,
  },
  {
    id: uuidv4(),
    question_id: questions[23].id,
    option_text: "True",
    is_correct: true,
  },
  {
    id: uuidv4(),
    question_id: questions[23].id,
    option_text: "False",
    is_correct: false,
  },
];

// ----------------- Fill in Blank Answers -------------
const fibAnswersSeed: FibAnswers[] = [
  {
    id: uuidv4(),
    question_id: questions[1].id,
    answer_text: "2x",
  },
  {
    id: uuidv4(),
    question_id: questions[2].id,
    answer_text: "x^3",
  },
  {
    id: uuidv4(),
    question_id: questions[4].id,
    answer_text: "3,000,000",
  },
  {
    id: uuidv4(),
    question_id: questions[6].id,
    answer_text: "France",
  },
  {
    id: uuidv4(),
    question_id: questions[9].id,
    answer_text: "e4",
  },
  {
    id: uuidv4(),
    question_id: questions[11].id,
    answer_text: "L-shape",
  },
  {
    id: uuidv4(),
    question_id: questions[13].id,
    answer_text: "Na",
  },
  {
    id: uuidv4(),
    question_id: questions[14].id,
    answer_text: "-3",
  },
  {
    id: uuidv4(),
    question_id: questions[14].id,
    answer_text: "-2",
  },
  {
    id: uuidv4(),
    question_id: questions[15].id,
    answer_text: "2",
  },
  {
    id: uuidv4(),
    question_id: questions[17].id,
    answer_text: "120",
  },
  {
    id: uuidv4(),
    question_id: questions[21].id,
    answer_text: "8",
  },
];

export { questions as questionsSeed, questionOptionsSeed, fibAnswersSeed };
