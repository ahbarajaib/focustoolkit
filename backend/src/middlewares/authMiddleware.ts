import User from "../models/UserModel.js";
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtUtils.js";

const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401).json({ message: "Not authorized, please login" });
      return;
    }

    try {
      const token = authHeader.split(" ")[1];
      const decoded = verifyToken(token);

      if (!decoded) {
        res.status(401).json({ message: "Invalid token" });
        return;
      }

      //find user and attach to request
      const user = await User.findById(decoded.userId);
      if (!user) {
        res.status(401).json({ message: "User not found" });
        return;
      }

      next();
    } catch (tokenError: any) {
      // Handle JWT verification errors gracefully
      res.status(401).json({
        message: "Invalid authentication token",
        error:
          process.env.NODE_ENV === "development"
            ? tokenError.message
            : undefined,
      });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Server error during authentication" });
  }
};

export { protect };
