import express from "express";
import { getTasks, createTask, editTask, editTaskDate, editTaskProgress, editTaskBucket, deleteTask } from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", editTask);
router.put("/:id/date", editTaskDate);
router.put("/:id/progress", editTaskProgress);
router.put("/:id/bucket", editTaskBucket);
router.delete("/:id", deleteTask);

export default router;
