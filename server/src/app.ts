import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "@systems/dBConnection";

const startServer = async () => {
  dotenv.config();

  const app: Express = express();
  const port = process.env.PORT;

  app.use(cors());
  app.use(express.json());

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
  });

  await connectDB;

  console.log("🔵 MongoDB connected...");

  app.listen(port, () => {
    console.log(`🟢 App listening at http://localhost:${port}`);
  });
};

startServer();
