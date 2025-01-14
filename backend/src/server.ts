import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import connectToDatabase from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import timeBlockRoutes from "./routes/timeBlockRoutes.js";
import cors from "cors";
dotenv.config();

const app: Express = express();

const corsOptions = {
  origin: "http://localhost:8081", // Replace with your React Native app's URL
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
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

startServer();
