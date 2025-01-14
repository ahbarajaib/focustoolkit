import dotenv from "dotenv";
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
// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/timeblock", timeBlockRoutes);

const startServer = async () => {
  try {
    await connectToDatabase();
    const port = process.env.PORT || 6001;
    const host = process.env.HOST || "localhost";
    app.listen(port, () => {
      console.log(`Server is running at http://${host}:${port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

startServer();
