import UserModel from "../models/userModel.js";

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
  const { username, firstName, lastName, password } = req.body;

  try {
    // Check if the user exists
    const existingUser = await UserModel.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details
    existingUser.username = username || existingUser.username;
    existingUser.firstName = firstName || existingUser.firstName;
    existingUser.lastName = lastName || existingUser.lastName;

    // If a new password is provided, hash and update it
    if (password) {
      existingUser.password = await bcrypt.hash(password, 10);
    }

    // Save the updated user to the database
    await existingUser.save();

    res.status(200).json(existingUser);
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

export const deleteAUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Check if the user exists
    const existingUser = await UserModel.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the user from the database
    await existingUser.remove();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};
