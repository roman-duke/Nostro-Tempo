USE ruday;

INSERT INTO categories (name, image, description)
VALUES (?, ?, ?);

INSERT INTO questions
(name, description, difficulty, correct_option_id, category_id)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
