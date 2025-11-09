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
  email VARCHAR(255) UNIQUE NOT NULL,
  role_id INT NOT NULL,
  password_hash VARCHAR(255) NULL,
  total_score INT DEFAULT 0,
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
  version INT NOT NULL DEFAULT 1,
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
  status ENUM('active', 'archived', 'deleted', 'draft') DEFAULT 'draft',
  created_by BINARY(16) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
  CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE questions_snapshots (
  id BINARY(16) NOT NULL,
  snapshot_version INT NOT NULL DEFAULT 1,
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
  PRIMARY KEY (id, snapshot_version),
  CONSTRAINT fk_qs_question FOREIGN KEY (id) REFERENCES questions(id),
  CONSTRAINT fk_category_snapshot FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE question_answers (
  id BINARY(16) PRIMARY KEY,
  version INT NOT NULL DEFAULT 1,
  question_id BINARY(16) NOT NULL,
  answer_text VARCHAR(255) NOT NULL,
  is_correct BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_question FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

CREATE TABLE question_answers_snapshots (
  id BINARY(16) NOT NULL,
  answer_snapshot_version INT NOT NULL DEFAULT 1,
  question_snapshot_id BINARY(16) NOT NULL,
  question_snapshot_version INT NOT NULL DEFAULT 1,
  answer_text VARCHAR(255) NOT NULL,
  is_correct BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id, answer_snapshot_version),
  CONSTRAINT fk_qas_qs FOREIGN KEY (question_snapshot_id, question_snapshot_version) REFERENCES questions_snapshots(id, snapshot_version)
);

CREATE TABLE quizzes (
  id BINARY(16) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(512) NOT NULL,
  is_ad_hoc BOOLEAN NOT NULL,
  -- num_of_questions INT NOT NULL, ---> This is meant to be computed because it is dynamic (dependent on quiz_questions)
  -- category_id INT NOT NULL,
  overall_difficulty ENUM('EASY', 'MEDIUM', 'HARD') NOT NULL,
  created_by BINARY(16) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_quizzes_users FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE quiz_questions (
  quiz_id BINARY(16) NOT NULL,
  question_snapshot_id BINARY(16) NOT NULL,
  question_snapshot_version INT NOT NULL,
  question_order INT NOT NULL,
  PRIMARY KEY (quiz_id, question_snapshot_id),
  CONSTRAINT fk_quiz_questions_qs FOREIGN KEY (question_snapshot_id, question_snapshot_version) REFERENCES questions_snapshots(id, snapshot_version) ON DELETE CASCADE,
  CONSTRAINT fk_quiz_questions_quizzes FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

CREATE TABLE quiz_analytics (
  quiz_id BINARY(16) NOT NULL,
  shared_count INT NOT NULL,
  starred_count INT NOT NULL,
  total_attempts INT NOT NULL
);

CREATE TABLE trivia_sessions (
  id BINARY(16) PRIMARY KEY NOT NULL,
  quiz_id BINARY(16) NOT NULL,
  quiz_title VARCHAR(255) NOT NULL,
  -- difficulty_level ENUM('EASY', 'MEDIUM', 'HARD') NOT NULL,
  -- num_of_questions INT NOT NULL,
  is_timed BOOLEAN DEFAULT TRUE,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_trivia_sessions_quizzes FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);

-- CREATE TABLE session_questions (
--   session_id BINARY(16) NOT NULL,
--   question_snapshot_id BINARY(16) NOT NULL,
--   question_snapshot_version INT NOT NULL,
--   question_order INT NOT NULL,
--   CONSTRAINT fk_sq_question FOREIGN KEY (question_snapshot_id, question_snapshot_version) REFERENCES questions_snapshots(id, snapshot_version),
--   CONSTRAINT fk_sq_session FOREIGN KEY (session_id) REFERENCES trivia_sessions(id)
-- );

CREATE TABLE session_users_answers (
  session_id BINARY(16) NOT NULL,
  user_id BINARY(16) NOT NULL,
  question_snapshot_id BINARY(16) NOT NULL,
  question_snapshot_version INT NOT NULL,
  selected_answer VARCHAR(255),
  total_score INT DEFAULT 0,
  is_correct BOOLEAN DEFAULT NULL,
  time_spent_ms INT DEFAULT NULL,
  PRIMARY KEY(user_id, question_snapshot_id, session_id),
  CONSTRAINT fk_suas_question FOREIGN KEY (question_snapshot_id, question_snapshot_version) REFERENCES questions_snapshots(id, snapshot_version),
  CONSTRAINT fk_session FOREIGN KEY (session_id) REFERENCES trivia_sessions(id)
);

CREATE TABLE session_users_summary (
  id BINARY(16) PRIMARY KEY,
  session_id BINARY(16) NOT NULL,
  user_id BINARY(16) NOT NULL,
  total_score INT NOT NULL DEFAULT 0,
  total_questions INT NOT NULL DEFAULT 10,
  correct_answers INT NOT NULL DEFAULT 0,
  average_time_ms INT DEFAULT NULL,
  started_at TIMESTAMP DEFAULT NULL,
  completed_at TIMESTAMP DEFAULT NULL,
  rank_in_session INT DEFAULT NULL,
  CONSTRAINT fk_summary_session FOREIGN KEY (session_id) REFERENCES trivia_sessions(id),
  CONSTRAINT fk_summary_user FOREIGN KEY (user_id) REFERENCES users(id),
  UNIQUE KEY uq_summary_session_user (session_id, user_id)
);
