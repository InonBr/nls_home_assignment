import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "@systems/dBConnection";
import notesRouter from "@routes/notesRouter";

const startServer = async () => {
  dotenv.config();

  const app: Express = express();
  const port = process.env.PORT;

  app.use(cors());
  app.use(express.json());

  app.use("/api", notesRouter);

  await connectDB;

  console.log("🔵 MongoDB connected...");

  app.listen(port, () => {
    console.log(`🟢 App listening at http://localhost:${port}`);
  });
};

startServer();
