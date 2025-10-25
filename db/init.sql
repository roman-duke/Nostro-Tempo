DROP DATABASE IF EXISTS ruday;

CREATE DATABASE ruday;

USE ruday;

CREATE TABLE roles (
  id INT PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE users (
  id BINARY(16) PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role_id INT NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id)
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
  time_limit_ms INT DEFAULT 10000,
  match_type ENUM('levenshtein', 'fuzzy', 'exact') DEFAULT 'exact',
  explanation_text TEXT,
  created_by BINARY(16) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
  CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE questions_snapshots (
  id BINARY(16) PRIMARY KEY,
  category_id INT NOT NULL,
  name VARCHAR(255) NULL,
  description TEXT NOT NULL,
  media_url VARCHAR(512) NULL,
  media_type ENUM('image', 'audio', 'video') NULL,
  question_type ENUM('multiple_choice', 'true_false', 'fill_in_blank') NOT NULL,
  difficulty ENUM('EASY', 'MEDIUM', 'HARD') NOT NULL,
  time_limit_ms INT DEFAULT 10000,
  match_type ENUM('levenshtein', 'fuzzy', 'exact') DEFAULT 'exact',
  explanation_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_category_snapshot FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE question_answers (
  id BINARY(16) PRIMARY KEY,
  question_id BINARY(16) NOT NULL,
  answer_text VARCHAR(255) NOT NULL,
  is_correct BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_question FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

CREATE TABLE question_answers_snapshots (
  id BINARY(16) PRIMARY KEY,
  question_id BINARY(16) NOT NULL,
  answer_text VARCHAR(255) NOT NULL,
  is_correct BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_question_snapshot FOREIGN KEY (question_id) REFERENCES questions_snapshots(id)
);

CREATE TABLE quizzes (
  id BINARY(16) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(512) NOT NULL,
  -- num_of_questions INT NOT NULL, ---> This is meant to be computed because it is dynamic (dependent on quiz_questions)
  category_id INT NOT NULL,
  overall_difficulty ENUM('EASY', 'MEDIUM', 'HARD') NOT NULL,
  created_by BINARY(16) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_quiz_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE quiz_questions (
  quiz_id BINARY(16) NOT NULL,
  question_id BINARY(16) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (quiz_id, question_id),
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

CREATE TABLE quiz_analytics (
  quiz_id BINARY(16) NOT NULL,
  shared_count INT NOT NULL,
  starred_count INT NOT NULL,
  total_attempts INT NOT NULL
);

CREATE TABLE trivia_sessions (
  id BINARY(16) PRIMARY KEY NOT NULL,
  quiz_id BINARY(16) DEFAULT NULL,
  num_of_questions INT NOT NULL,
  expires_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- user_id BINARY(16) NOT NULL,
  -- correct_answers INT NOT NULL,
  -- total_score INT DEFAULT 0,
  -- started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);

CREATE TABLE session_users_answers (
  session_id BINARY(16) NOT NULL,
  user_id BINARY(16) NOT NULL,
  question_snapshot_id BINARY(16) NOT NULL,
  question_order INT NOT NULL,
  selected_answer VARCHAR(255),
  is_correct BOOLEAN DEFAULT NULL,
  time_spent_ms INT DEFAULT NULL,
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(user_id, question_snapshot_id, session_id),
  CONSTRAINT fk_session_question FOREIGN KEY (question_snapshot_id) REFERENCES questions_snapshots(id),
  CONSTRAINT fk_session FOREIGN KEY (session_id) REFERENCES trivia_sessions(id)
);
