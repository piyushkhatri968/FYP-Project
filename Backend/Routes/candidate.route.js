import express from "express";
const router = express.Router();
import {
  postCandidateDetails,
  getCandidateDetails,
  getAppliedJobs,
} from "../Controller/Candidate.controller.js";

router.get("/getData/:id", getCandidateDetails);
router.put("/postData/:id", postCandidateDetails);
router.get("/appliedJobs/:id", getAppliedJobs);

export default router;
