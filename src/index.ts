import express, { Express } from "express";
import "dotenv/config";
import { appRouter } from "./routes/index.js";

const app: Express = express();
const port = process.env.PORT || 3000;

// Configure express to handle JSON data
app.use(express.json());

// Expose all routes
app.use("/v1", appRouter);

app.get("/", (req, res) => {
  const template = `====================================\nWelcome to Rudium Play!!\n====================================`;
  res.send(template);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
