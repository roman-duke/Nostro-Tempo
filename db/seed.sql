USE ruday;

INSERT INTO categories (name, image, description)
VALUES (?, ?, ?);

INSERT INTO questions
(name, description, difficulty, category_id)
VALUES (?, ?, ?, ?);
