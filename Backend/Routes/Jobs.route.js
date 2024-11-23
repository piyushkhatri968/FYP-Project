import express from "express";
const router = express.Router();

import { createJobPost, deleteJobPost, editJobPost, getJobPosts } from "../Controller/Jobs.controller.js";

router.post("/createJobPost", createJobPost);
router.get("/getJobPosts", getJobPosts);

router.put("/:id", editJobPost)
router.delete("/:id", deleteJobPost)


export default router;
