import { Router } from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  likePost,
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

// like/dislike a post by ID
router.post("/:postId/like", likePost);

export default router;
