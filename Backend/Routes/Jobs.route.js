import express from "express";
const router = express.Router();

import {
  createJobPost,
  deleteJobPost,
  editJobPost,
  getJobPosts,
  favoriteJob,
  getFavoriteJobs,
} from "../Controller/Jobs.controller.js";

router.post("/createJobPost", createJobPost);
router.get("/getJobPosts", getJobPosts);
router.put("/:id", editJobPost);
router.delete("/:id", deleteJobPost);

//users favorite jobs

router.post("/favoriteJob", favoriteJob);
router.get("/favoriteJob/:id", getFavoriteJobs);

export default router;
