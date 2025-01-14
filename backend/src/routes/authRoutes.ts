import express, { Router, Request, Response } from "express";
import passport from "passport";
import { register, login } from "../controllers/authController.ts";
import { protect } from "../middlewares/authMiddleware.ts";
import {
  validateUser,
  validateLogin,
} from "../middlewares/validationMiddleware.ts";

const router: Router = express.Router();

router.post("/register", validateUser, register);

router.post("/login", validateLogin, login);

export default router;
