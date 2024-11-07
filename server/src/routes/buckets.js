import express from "express";
import { getBuckets, createBucket, editBucket, editBucketPosition, deleteBucket } from "../controllers/bucketController.js";

const router = express.Router();

router.get("/", getBuckets);
router.post("/", createBucket);
router.put("/", editBucket);
router.put("/", editBucketPosition);
router.delete("/", deleteBucket);

export default router;
