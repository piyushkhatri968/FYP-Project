import express from "express";

const router = express.Router();

import { createJobPost, getJobPosts } from "../Controller/Jobmangement.js";

router.post("/createJobPost", createJobPost);
router.get("/getJobPosts", getJobPosts);

export default router;
