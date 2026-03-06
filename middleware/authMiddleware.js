import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = async (req, res, next) => {

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token Missing"
    });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded Token:", decoded);

    req.user = await User.findById(decoded.id).select("-password");

    console.log("Authenticated User:", req.user);

    next();

  } catch (error) {

    return res.status(401).json({
      message: "Invalid or Expired Token",
      error: error.message
    });

  }
};