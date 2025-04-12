import express from "express";
const router = express.Router();

import {
  createJobPost,
  deleteJobPost,
  editJobPost,
  getJobPosts,
  getJobPostsRecommendation,
} from "../Controller/Jobs.controller.js";

router.post("/createJobPost", createJobPost);
router.get("/getJobPosts", getJobPosts);
router.get("/getJobPostsRecommendation", getJobPostsRecommendation);
router.put("/:id", editJobPost);
router.delete("/:id", deleteJobPost);

export default router;
