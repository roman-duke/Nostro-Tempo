USE ruday;

-- 1. Seed 'application' user
INSERT INTO users (id, first_name, last_name, email, role)
VALUES (UUID_TO_BIN('a8f9856f-6232-410e-a29b-c64b79c5ff84'), 'System', 'Admin', 'system@rudiumplay.local', 'admin')
ON DUPLICATE KEY UPDATE email=email;

-- 2. Seed Categories
-- Values are largely static for now, so no need to dynamically seed
INSERT INTO categories (id, name, image_url, description)
VALUES
  (1, "Math", "https://media.istockphoto.com/id/1219382595/vector/math-equations-written-on-a-blackboard.jpg?s=1024x1024&w=is&k=20&c=FuAlO8n7UyfykyqpZMhWpQD66wIJuIbgXG7ZQPRgoPk=", "Explore the world of numbers, equations and problem solving."),
  (2, "Physics", "https://media.istockphoto.com/id/936903524/vector/blackboard-inscribed-with-scientific-formulas-and-calculations-in-physics-and-mathematics-can.jpg?s=1024x1024&w=is&k=20&c=t0hLsuRdtnbLwAu5UMC46_ATICIJX0N3KteUaxhFH-0=", "Discover the laws of nature and the principles governing the universe."),
  (3, "Football", "https://static.vecteezy.com/system/resources/previews/027/829/023/non_2x/close-up-of-many-soccer-players-kicking-a-football-on-a-field-competition-scene-created-with-generative-ai-technology-free-photo.jpg", "Test your knowledge of the beautiful game, its players and iconic moments."),
  (4, "Chess", "https://media.istockphoto.com/id/1395539260/photo/chess-game-competition-business-concept-business-competition-concept-fighting-and-confronting.jpg?s=1024x1024&w=is&k=20&c=vG6NBBhxsAn1m_ZjnpJxmiRJ6uqylR98rpb-t1H_OLc=", "Dive into the strategies, tactics, and history of the ultimate mind sport."),
  (5, "History", "https://media.istockphoto.com/id/183890041/photo/lincoln-memorial.jpg?s=1024x1024&w=is&k=20&c=rOcL1ilsyhz_Aa-BO-WkYMS9BFbLqm10x64rh_1L3uU=", "Test your knowledge about significant events, people and developments from the past.")
ON DUPLICATE KEY UPDATE name=name;
