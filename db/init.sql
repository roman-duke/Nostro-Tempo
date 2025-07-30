DROP DATABASE IF EXISTS ruday;

CREATE DATABASE ruday;

USE ruday;

CREATE TABLE categories (
  id UUID PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  image VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE questions (
  id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
  description TEXT NOT NULL,
  difficulty ENUM('EASY', 'MEDIUM', 'HARD') NOT NULL,
  correct_option_id BINARY(16) NOT NULL,
  category_id BINARY(16) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- CREATE TABLE trivia_sessions (
--   trivia_session_id UUID PRIMARY KEY,
--   user_id UUID NOT NULL,
--   total_score INT DEFAULT 0,
--   attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   expires_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   time_spent INT DEFAULT 0,
--   FOREIGN KEY (user_id) REFERENCES users(user_id)
-- );

-- CREATE TABLE trivia_session_questions (
--   session_id UUID NOT NULL,
--   question_id INT NOT NULL,
--   time_spent INT DEFAULT 0,
--   is_correct BOOLEAN DEFAULT NULL,
--   is_answered BOOLEAN DEFAULT NULL,
--   PRIMARY KEY(session_id, question_id)
-- );
