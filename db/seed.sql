USE ruday;

INSERT INTO categories (name, image, description)
VALUES (?, ?, ?);

INSERT INTO questions
(name, description, difficulty, category_id)
VALUES (?, ?, ?, ?);

INSERT INTO question_options
(question_id, option_description)
VALUES (?, ?);
