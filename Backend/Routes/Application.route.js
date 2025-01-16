import express from "express";
const router = express.Router();

import {
  getApplications,
  applyJobApplication,
  updateStatus,
  getJobStatus,
  getShortlistedCandidates,
  updateShortListId
} from "../Controller/Application.controller.js";

// fetching application
router.get("/get", getApplications);
// updating: status:
router.post("/:id/status", updateStatus);
router.post("/applyJob", applyJobApplication);
router.get("/jobStatus", getJobStatus);


// handling shortlist:
router.get("/shortlisted-candidates", getShortlistedCandidates);

router.patch("shortlist/:id",updateShortListId)
export default router;
