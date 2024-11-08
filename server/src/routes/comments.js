import express from "express";
import { getComments, createComment } from "../controllers/commentController.js";

const router = express.Router();

router.get("/:taskId/comments", getComments);
router.post("/:taskId/comments", createComment);


export default router;
