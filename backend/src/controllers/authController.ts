import { Request, Response } from "express";
import User from "../models/UserModel.ts";
import { comparePassword, hashPassword } from "../utils/bcryptUtils.ts";
import { generateToken } from "../utils/jwtUtils.ts";

const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).send({ message: "User already exist" });
      return;
    }
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).send({ message: "User doesn't exist" });
      return;
    }

    // Check if user has password-based authentication enabled
    if (!user.password) {
      res.status(400).json({
        message: "Please login with Google",
        isGoogleUser: true,
      });
      return;
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
    });

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        authMethods: user.authMethods,
      },
      token,
      message: "Login Successful",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export { register, login };
