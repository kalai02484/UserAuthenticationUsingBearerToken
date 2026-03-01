import User from "../models/userSchema.js";

export const registerUser = async (req, res) => {
  try {
    //Method 1
    //const {username, email, password} = req.body;
    //const newUser = new User({username, email, password});
    //await newUser.save();
    //res.status(200).json({message: "User Registered Successfully", data: newUser});
    //method 2
    const newUser = new User(req.body);
    await newUser.save();
    res
      .status(200)
      .json({ message: "User Registered Successfully", data: newUser });
  } catch (error) {
    res
      .status(503)
      .json({
        message: "Server Error, Unable to Register User" || error.message,
      });
  }
};
