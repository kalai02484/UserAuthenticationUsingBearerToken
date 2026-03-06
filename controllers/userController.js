import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists, go to Login",
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashpassword,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User Registered Successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error, Unable to Register User",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        message: "User Not found - Please enter valid email",
      });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Password Mismatch, Please Enter Correct Password",
      });
    }

    // JWT Token Generation
    const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    //existingUser.token = token;
    //await existingUser.save();

    return res.status(200).json({
      message: "User Login Successful",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error, Unable to Login",
      error: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({ message: "User", data: user });
  } catch (error) {
    res.status(503).json({ message: "Unable to fetch the data" });
  }
};
