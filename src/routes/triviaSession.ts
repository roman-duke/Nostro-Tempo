import express from "express";
import { triviaSessionController } from "../controllers/triviaSession.js";

const triviaSessionRoute = express.Router();

triviaSessionRoute.post(
  "/triviaSessions",
  triviaSessionController.createSession,
);
triviaSessionRoute.post("/triviaSession/grade");

export { triviaSessionRoute };
