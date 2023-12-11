import { Router } from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/PostController.js";

const router = Router();

// create a post
router.post("/", createPost);

// Get all posts
router.get("/", getPosts);

// Get a specific post by ID
router.get("/:postId", getPost);

// Update a post by ID
router.put("/:postId", updatePost);

// Delete a post by ID
router.delete("/:postId", deletePost);

export default router;
