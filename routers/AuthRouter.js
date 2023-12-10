import { Router } from "express";
const router = Router();

router.get("/", async (req, res) => {
  res.send("hi there");
});

export default router;
