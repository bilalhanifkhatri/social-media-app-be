import { Router } from "express";
import {
  deleteAUser,
  followUser,
  getAUser,
  getUsers,
  unFollowUser,
  updateAUser,
} from "../controllers/UserController.js";

const router = Router();

// Get all users
router.get("/", getUsers);

// Get a specific user by ID
router.get("/:userId", getAUser);

// Update a user by ID
router.put("/:userId", updateAUser);

// Delete a user by ID
router.delete("/:userId", deleteAUser);

// Update a user by ID
router.put("/:userId/follow", followUser);

// Update a user by ID
router.put("/:userId/unfollow", unFollowUser);

export default router;
