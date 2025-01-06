import express, { Router, Request, Response } from "express";
import passport from "passport";
import {
  register,
  login,
  googleAuthCallback,
} from "../controllers/authController.ts";
import { protect } from "../middlewares/authMiddleware.ts";
import {
  validateUser,
  validateLogin,
} from "../middlewares/validationMiddleware.ts";

const router: Router = express.Router();

router.post("/register", validateUser, register);

router.post("/login", validateLogin, login);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: true,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/api/auth/protected",
    failureRedirect: "/auth/login",
    session: true,
  }),
  googleAuthCallback
);

// Protected route (accessible by any logged-in user)
router.get("/protected", protect, (req: Request, res: Response) => {
  res.json({ message: "Protected route", user: req.user });
});

export default router;
