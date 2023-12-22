import { Router } from "express";
import { addMessage, getMesssages } from "../controllers/MessageController.js";

const router = Router();

// Get all users
router.post("/", addMessage);
router.get("/:chatId", getMesssages);

export default router;
