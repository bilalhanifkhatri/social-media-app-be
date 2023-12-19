import { Router } from "express";
import {
  deleteAUser,
  followUser,
  getAUser,
  getUsers,
  unFollowUser,
  updateAUser,
} from "../controllers/UserController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

// Get all users
router.get("/", getUsers);

// Get a specific user by ID
router.get("/:userId", getAUser);

// Update a user by ID
router.put("/:userId", authMiddleware, updateAUser);

// Delete a user by ID
router.delete("/:userId", authMiddleware, deleteAUser);

// Update a user by ID
router.put("/:userId/follow", authMiddleware, followUser);

// Update a user by ID
router.put("/:userId/unfollow", authMiddleware, unFollowUser);

export default router;
