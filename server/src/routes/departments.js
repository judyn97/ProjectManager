import express from "express";
import { getDepartments, createDepartment, editDepartment, deleteDepartment } from "../controllers/departmentController.js";

const router = express.Router();

router.get("/", getDepartments);
router.post("/", createDepartment);
router.put("/", editDepartment);
router.delete("/", deleteDepartment);

export default router;
