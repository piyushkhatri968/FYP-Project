import express from "express";
const router = express.Router();

import { createJobPost, getJobPosts } from "../Controller/Jobs.controller.js";

router.post("/createJobPost", createJobPost);
router.get("/getJobPosts", getJobPosts);

export default router;
