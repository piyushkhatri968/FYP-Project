import express from "express";
const router = express.Router();
import {
  postCandidateDetails,
  getCandidateDetails,
} from "../Controller/Candidate.controller.js";

router.get("/getData/:id", getCandidateDetails);
router.put("/postData/:id", postCandidateDetails);

export default router;
