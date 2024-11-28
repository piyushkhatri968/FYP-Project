import express from "express";
const router = express.Router();
import {
  postCandidateDetails,
  getCandidateDetails,
  getAppliedJobs,
  getSavedJobs,
  toggleFavoriteJob,
  getFavorites,
} from "../Controller/Candidate.controller.js";

router.get("/getData/:id", getCandidateDetails);
router.put("/postData/:id", postCandidateDetails);
router.get("/appliedJobs/:id", getAppliedJobs); //
router.get("/savedJobs/:id", getSavedJobs);
router.post("/toggleFavoriteJob", toggleFavoriteJob);
router.get("/getFavorites", getFavorites);

export default router;
