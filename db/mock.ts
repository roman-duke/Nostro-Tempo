// Basic Mock Questions used to seed the Questions table in the database
interface Question {
  name: string;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  correctAnswerId?: string;
  categoryId: number;
  createdAt?: string;
  updatedAt?: string;
}

const questions: Question[] = [
  {
    name: "Basic Math",
    description: "What is 2 + 2?",
    difficulty: "EASY",
    categoryId: 1, // e.g., Math category
  },
  {
    name: "Physics Concept",
    description: "Which of the following is Newton's Third Law?",
    difficulty: "MEDIUM",
    categoryId: 2, // e.g., Physics category
  },
  {
    name: "Football Knowledge",
    description: "Which country won the FIFA World Cup in 2018?",
    difficulty: "HARD",
    categoryId: 3, // e.g., Football category
  },
  {
    name: "Chess Strategy",
    description:
      "What is the term for a situation where neither player can checkmate the other?",
    difficulty: "EASY",
    categoryId: 4, // e.g., Chess category
  },
  {
    name: "General Science",
    description: "What is the chemical symbol for water?",
    difficulty: "EASY",
    categoryId: 5, // e.g., Science category
  },
  {
    name: "Geography Trivia",
    description: "Which is the largest desert in the world?",
    difficulty: "HARD",
    categoryId: 6, // e.g., Geography category
  },
];

const categories = [
  {
    name: "Math",
    image:
      "https://www.istockphoto.com/vector/math-equations-written-on-a-blackboard-gm1219382595-356664698",
    description: "Explore the world of numbers, equations and problem solving.",
  },
  {
    name: "Physics",
    image:
      "https://www.istockphoto.com/vector/blackboard-inscribed-with-scientific-formulas-and-calculations-in-physics-and-gm936903524-256298904?searchscope=image%2Cfilm",
    description:
      "Discover the laws of nature and the principles governing the universe.",
  },
  {
    name: "Football",
    image:
      "https://www.vecteezy.com/photo/27829023-close-up-of-many-soccer-players-kicking-a-football-on-a-field-competition-scene-created-with-generative-ai-technology",
    description:
      "Test your knowledge of the beautiful game, its players and iconic moments.",
  },
  {
    name: "Chess",
    image:
      "https://www.istockphoto.com/photo/chess-game-competition-business-concept-business-competition-concept-fighting-and-gm1395539260-450607467?searchscope=image%2Cfilm",
    description:
      "Dive into the strategies, tactics, and history of the ultimate mind sport.",
  },
  {
    name: "Science",
    image:
      "https://www.istockphoto.com/photo/close-up-of-examining-of-test-sample-under-the-microscope-gm911834392-251042959?searchscope=image%2Cfilm",
    description:
      "Uncover fascinating facts across biology, chemistry and more.",
  },
  {
    name: "Geography",
    image:
      "https://www.istockphoto.com/photo/india-and-the-world-gm840213124-136833099?searchscope=image%2Cfilm",
    description:
      "Travel the globe with questions about countries, landmarks, and maps.",
  },
];

export { questions, categories };
