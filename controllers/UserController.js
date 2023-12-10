import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    const savedUserData = users?.map((user) => {
      const { password, ...otherDetails } = user.toObject();
      return otherDetails;
    });
    res.status(200).json(savedUserData);
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

export const getAUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await UserModel.findById(userId);
    const { password, ...otherDetails } = user.toObject();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(otherDetails);
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

export const updateAUser = async (req, res) => {
  const userId = req.params.userId;
  const { currentUserId, currentUserAdminStatus, password } = req.body;

  // Check if the user making the request is authorized to update the user
  if (userId === currentUserId || currentUserAdminStatus) {
    try {
      // If a new password is provided, hash it
      let hashedPassword;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      // Build the update object based on whether a new password is provided
      const updateObject = password
        ? { password: hashedPassword, ...req.body }
        : req.body;

      // Find and update the user
      const existingUser = await UserModel.findByIdAndUpdate(
        userId,
        updateObject,
        { new: true }
      );

      // Check if the user was not found
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Return the updated user
      res.status(200).json(existingUser);
    } catch (error) {
      res.status(500).json({ message: error?.message });
    }
  } else {
    // Return a 403 Forbidden status if the user is not authorized
    res.status(403).json({ message: "Unauthorized to update this user" });
  }
};

export const deleteAUser = async (req, res) => {
  const userId = req.params.userId;
  const { currentUserId, currentUserAdminStatus } = req.body;
  if (userId === currentUserId || currentUserAdminStatus) {
    try {
      await UserModel.findByIdAndDelete(userId);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error?.message });
    }
  } else {
    // Return a 403 Forbidden status if the user is not authorized
    res.status(403).json({ message: "Unauthorized to delete this user" });
  }
};
