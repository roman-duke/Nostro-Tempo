DROP DATABASE IF EXISTS ruday;

CREATE DATABASE ruday;

USE ruday;

CREATE TABLE guests (
  id BINARY(16) PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id BINARY(16) PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  image_url VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE questions (
  id BINARY(16) PRIMARY KEY,
  category_id INT NOT NULL,
  name VARCHAR(255) NULL,
  description TEXT NOT NULL,
  media_url VARCHAR(512) NULL,
  media_type ENUM('image', 'audio', 'video') NULL,
  question_type ENUM('multiple_choice', 'true_false', 'fill_in_blank') NOT NULL,
  difficulty ENUM('EASY', 'MEDIUM', 'HARD') NOT NULL,
  created_by BINARY(16) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
  CONSTRAINT fk_user FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE question_options (
  id BINARY(16) PRIMARY KEY,
  question_id BINARY(16) NOT NULL,
  option_text VARCHAR(255) NOT NULL,
  is_correct BOOLEAN DEFAULT FALSE,
  CONSTRAINT fk_question FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- Fill in Blank Answers
CREATE TABLE fib_answers (
  id BINARY(16) PRIMARY KEY,
  question_id BINARY(16) NOT NULL,
  answer_text VARCHAR(255) NOT NULL,
  CONSTRAINT fk_fib_question FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- CREATE TABLE trivia_sessions (
--   id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
--   user_id BINARY(16) NOT NULL,
--   total_score INT DEFAULT 0,
--   -- attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   -- completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   -- expires_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   FOREIGN KEY (user_id) REFERENCES guest_users(id)
-- );

-- CREATE TABLE trivia_session_questions (
--   session_id BINARY(16) NOT NULL,
--   question_id BINARY(16) NOT NULL,
--   time_spent INT DEFAULT 0,
--   is_correct BOOLEAN DEFAULT NULL,
--   -- is_answered BOOLEAN DEFAULT NULL,
--   PRIMARY KEY(session_id, question_id)
-- );
