import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    const savedUserData = users?.map((user) => {
      const { password, ...otherDetails } = user.toObject();
      return otherDetails;
    });
    res.status(200).json({
      res: "success",
      message: "data fetched successfully",
      data: savedUserData,
    });
  } catch (error) {
    res.status(500).json({
      res: "error",
      message: `some went wrong! ${error?.message}`,
    });
  }
};

export const getAUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await UserModel.findById(userId);
    const { password, ...otherDetails } = user.toObject();
    if (!user) {
      return res.status(404).json({ res: "error", message: "User not found" });
    }
    res.status(200).json({
      data: otherDetails,
      res: "success",
      message: "fetch successfully",
    });
  } catch (error) {
    res.status(500).json({
      res: "error",
      message: `some went wrong! ${error?.message}`,
    });
  }
};

export const updateAUser = async (req, res) => {
  const userId = req.params.userId;
  const { _id, currentUserAdminStatus, password } = req.body;

  // Check if the user making the request is authorized to update the user
  if (userId === _id || currentUserAdminStatus) {
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
        return res
          .status(404)
          .json({ res: "error", message: "User not found" });
      }

      const token = jwt.sign(
        {
          username: existingUser?.username,
          id: existingUser?._id,
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      // Return the updated user
      res.status(200).json({
        data: existingUser,
        res: "success",
        message: "updated successfully",
        token,
      });
    } catch (error) {
      res.status(500).json({
        res: "error",
        message: `some went wrong! ${error?.message}`,
      });
    }
  } else {
    // Return a 403 Forbidden status if the user is not authorized
    res
      .status(403)
      .json({ message: "Unauthorized to update this user", res: "error" });
  }
};

export const deleteAUser = async (req, res) => {
  const userId = req.params.userId;
  const { _id, currentUserAdminStatus } = req.body;
  if (userId === _id || currentUserAdminStatus) {
    try {
      await UserModel.findByIdAndDelete(userId);
      res
        .status(200)
        .json({ res: "success", message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({
        res: "error",
        message: `some went wrong! ${error?.message}`,
      });
    }
  } else {
    // Return a 403 Forbidden status if the user is not authorized
    res
      .status(403)
      .json({ message: "Unauthorized to delete this user", res: "error" });
  }
};

// follow user
export const followUser = async (req, res) => {
  const userId = req.params.userId;
  const { currentUserId } = req.body;
  if (currentUserId === userId) {
    res.status(403).json({ message: "Action forbidden" });
  } else {
    try {
      const followUser = await UserModel.findById(userId);
      const followingUser = await UserModel.findById(currentUserId);

      if (!followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $push: { followers: currentUserId } });
        await followingUser.updateOne({ $push: { followings: userId } });
        res.status(200).json({ message: "User followed!", res: "success" });
      } else {
        res
          .status(403)
          .json({ message: "User is Already followed by you", res: "error" });
      }
    } catch (error) {
      res.status(500).json({
        res: "error",
        message: `some went wrong! ${error?.message}`,
      });
    }
  }
};

// follow user
export const unFollowUser = async (req, res) => {
  const userId = req.params.userId;
  const { currentUserId } = req.body;
  if (currentUserId === userId) {
    res.status(403).json({ message: "Action forbidden", res: "error" });
  } else {
    try {
      const followUser = await UserModel.findById(userId);
      const followingUser = await UserModel.findById(currentUserId);

      if (followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $pull: { followers: currentUserId } });
        await followingUser.updateOne({ $pull: { followings: userId } });
        res.status(200).json({ res: "success", message: "User unfollowed!" });
      } else {
        res
          .status(403)
          .json({ res: "error", message: "User is not followed by you" });
      }
    } catch (error) {
      res.status(500).json({
        res: "error",
        message: `some went wrong! ${error?.message}`,
      });
    }
  }
};
