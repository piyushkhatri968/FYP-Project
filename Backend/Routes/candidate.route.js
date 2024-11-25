import express from "express";
const router = express.Router();
import {
  getCandidateDetails,
  postCandidateDetails,
} from "../Controller/Candidate.controller.js";

router.get("/userData/:id", getCandidateDetails);

router.post("/postData/:id", postCandidateDetails);

export default router;
