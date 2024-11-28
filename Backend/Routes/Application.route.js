import express from "express";
const router = express.Router();

import {
  getApplications,
  applyJobApplication,
  updateStatus,
  getJobStatus,
} from "../Controller/Application.controller.js";

// fetching application
router.get("/get", getApplications);
// updating: status:
router.post("/:id/status", updateStatus);
router.post("/applyJob", applyJobApplication);
router.get("/jobStatus", getJobStatus);

export default router;
