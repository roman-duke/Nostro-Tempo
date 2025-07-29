USE ruday;

INSERT INTO categories (name, image, description)
VALUES (?, ?, ?);

INSERT INTO questions
(description, difficulty, correct_answer, category_id)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
