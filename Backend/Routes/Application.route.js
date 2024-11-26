import express from "express";
const router = express.Router();

import {
  getApplications,
  applyJobApplication,
} from "../Controller/Application.controller.js";


// fetching application
router.get("/get", getApplications);

router.post("/applyJob", applyJobApplication);

export default router;
