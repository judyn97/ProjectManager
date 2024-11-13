import express from "express";
import { getEvents, createEvent, editEvent, deleteEvent } from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getEvents);
router.post("/", createEvent);
router.put("/:id", editEvent);
router.delete("/:id", deleteEvent);

export default router;
