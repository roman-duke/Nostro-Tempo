USE ruday;

INSERT INTO categories (name, image, description)
VALUES (?, ?, ?);

INSERT INTO questions
(name, description, option_a, option_b, option_c, option_d, difficulty, correct_answer, category_id)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
