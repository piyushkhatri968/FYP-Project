import express from "express";
const router = express.Router();

import {
  getApplications,
  applyJobApplication,
  updateStatus,
  getJobStatus,
  getShortlistedCandidates,
  updateShortListId,
  interviewScheduling,
  getinterviewScheduling,
  getApp,
  getAnalytics
} from "../Controller/Application.controller.js";

// fetching application
router.get("/get", getApplications);
// updating: status:
router.post("/:id/status", updateStatus);
router.post("/applyJob", applyJobApplication);
router.get("/jobStatus", getJobStatus);


// getApplications
router.get("/getApplication",getApp)


// handling shortlist:
router.get("/shortlisted-candidates", getShortlistedCandidates);

router.patch("shortlist/:id",updateShortListId)

// interview Scheduling
router.post("/interview-schedule", interviewScheduling)
router.get("/get-interview-schedule",getinterviewScheduling)



// anlaytics routes: 

  router.get("/analytics",getAnalytics)
export default router;

