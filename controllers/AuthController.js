import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Function to handle user login
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await UserModel.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found", res: "error" });
    }

    // Compare the entered password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid password", res: "error" });
    }

    // const { password, ...otherDetails } = user.toObject();
    // If the password is valid, you can create a token or handle the login as needed
    // For simplicity, we're just sending a success message and user data here

    const token = jwt.sign(
      {
        username: user?.username,
        id: user?._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      data: user,
      token: token,
      res: "success",
    });
  } catch (error) {
    res.status(500).json({ message: error?.message, res: "error" });
  }
};

// registering a new user
export const registerUser = async (req, res) => {
  const { username, firstName, lastName, password } = req.body;
  try {
    // Check if the username already exists in the database
    const existingUser = await UserModel.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        message: "Username already exists. Please choose a different username.",
        res: "error",
      });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance with the hashed password
    const newUser = new UserModel({
      username,
      firstName,
      lastName,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    const token = jwt.sign(
      {
        username: newUser?.username,
        id: newUser?._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "register successfully",
      data: newUser,
      res: "success",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error?.message, res: "error" });
  }
};
