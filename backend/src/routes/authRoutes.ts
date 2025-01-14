import express, { Router, Request, Response } from "express";
import { register, login } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import {
  validateUser,
  validateLogin,
} from "../middlewares/validationMiddleware.js";

const router: Router = express.Router();

router.post("/register", validateUser, register);

router.post("/login", validateLogin, login);

export default router;
