import express from "express";
import { getTasks, createTask, editTask, editTaskDate, editTaskProgress, editTaskBucket, deleteTask } from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.put("/", editTask);
router.put("/", editTaskDate);
router.put("/", editTaskProgress);
router.put("/", editTaskBucket);
router.delete("/", deleteTask);

export default router;
