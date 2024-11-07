import express from "express";
import { getProjects, createProject, editProject, deleteProject } from "../controllers/projectController.js";

const router = express.Router();

router.get("/", getProjects);
router.post("/", createProject);
router.put("/", editProject);
router.delete("/", deleteProject);

export default router;
