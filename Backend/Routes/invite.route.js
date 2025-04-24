// routes/hr.routes.js
import express from "express";
import {
  inviteCandidateToJob,
  getInvitedJobs,
} from "../Controller/jobinvite.controller.js";

const router = express.Router();

router.post("/invite", inviteCandidateToJob);

router.get("/invitedJobs/:candidateId", getInvitedJobs);

export default router;
