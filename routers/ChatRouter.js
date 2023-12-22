import { Router } from "express";
import { createChat, findChat, userChats } from "../controllers/chatController.js";

const router = Router();

// Get all users
router.post("/", createChat);
router.get("/:userId", userChats);
router.get("/find/:firstId/:secondId", findChat);

export default router;
