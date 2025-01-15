import * as dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import connectToDatabase from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import timeBlockRoutes from "./routes/timeBlockRoutes.js";
import cors from "cors";
dotenv.config();

const app: Express = express();

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:8081",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/timeblock", timeBlockRoutes);

app.get("/", (req, res) => {
  res.send("Backend running...");
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
});

const startServer = async () => {
  try {
    await connectToDatabase();
    const isProduction = process.env.NODE_ENV === "production";
    console.log(
      `Running in ${isProduction ? "production" : "development"} mode`
    );

    const port = process.env.PORT || 6001;

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

startServer();
