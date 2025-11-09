import express, { Express } from "express";
import "dotenv/config";
import { appRouter } from "./routes/index";
import qs from "qs"

const app: Express = express();
const port = process.env.PORT || 3000;

// Configure express to handle JSON data
app.use(express.json());

// Override the default query parser
app.set('query parser', qs.parse);

// Expose all routes
app.use("/v1", appRouter);

app.get("/", (req, res) => {
  const template = `====================================\nWelcome to Rudium Play!!\n====================================`;
  res.send(template);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
