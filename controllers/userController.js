import User from "../models/userSchema.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    //Method 1
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already Exists, go to Login" });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    console.log(hashpassword);

    const newUser = new User({ username, email, password: hashpassword });
    await newUser.save();
    res
      .status(200)
      .json({ message: "User Registered Successfully", data: newUser });
    //method 2
    //const newUser = new User(req.body);
    //await newUser.save();
    //res.status(200).json({ message: "User Registered Successfully", data: newUser });
  } catch (error) {
    res.status(503).json({
      message: "Server Error, Unable to Register User" || error.message,
    });
  }
};

export default loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(404).json({ message: "User Not found" });
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      res
        .status(404)
        .json({ message: "Password Mismatch, Please Enter Correct Password" });
    }
    res
      .status(200)
      .json({ message: "User Login Successfull", data: existingUser });
  } catch (error) {
    res.status(503).json({
      message: "Server Error, Unable to Login" || error.message,
    });
  }
};
