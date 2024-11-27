import express from "express";
const router = express.Router();

import {
  getApplications,
  applyJobApplication,
  updateStatus,
} from "../Controller/Application.controller.js";


// fetching application
router.get("/get", getApplications);
// updating: status: 
router.post("/:id/status", updateStatus);

router.post("/applyJob", applyJobApplication);

export default router;
