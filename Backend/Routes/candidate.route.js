import express from "express";
const router = express.Router();
import {
  postCandidateDetails,
  getCandidateDetails,
  getAppliedJobs,
  getSavedJobs,
  toggleFavoriteJob,
} from "../Controller/Candidate.controller.js";

router.get("/getData/:id", getCandidateDetails);
router.put("/postData/:id", postCandidateDetails);
router.get("/appliedJobs/:id", getAppliedJobs);
router.get("/savedJobs/:id", getSavedJobs);
router.post("/toggleFavoriteJob", toggleFavoriteJob);

export default router;
