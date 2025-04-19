import express from "express";
const router = express.Router();

import {
  createJobPost,
  deleteJobPost,
  editJobPost,
  getJobPosts,
  getJobPostsRecommendation,
  getJobDetails
} from "../Controller/Jobs.controller.js";

router.post("/createJobPost", createJobPost);
router.get("/getJobPosts", getJobPosts);
router.get("/getJobPostsRecommendation", getJobPostsRecommendation);
router.put("/:id", editJobPost);
router.delete("/:id", deleteJobPost);

//getJobsDetails:

router.get("/getJobDetails/:id", getJobDetails)

export default router;
