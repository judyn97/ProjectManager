import express from "express";
import { getBuckets, createBucket, editBucketPosition, deleteBucket } from "../controllers/bucketController.js";

const router = express.Router();

router.get("/", getBuckets);
router.post("/", createBucket);
router.put("/updatePosition", editBucketPosition);
router.delete("/:id", deleteBucket);

export default router;
