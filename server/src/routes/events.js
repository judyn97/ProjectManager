import express from "express";
import { getEvents, createEvent, editEvent, deleteEvent } from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getEvents);
router.post("/", createEvent);
router.put("/", editEvent);
router.delete("/", deleteEvent);

export default router;
