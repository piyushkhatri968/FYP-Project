import express from "express";
const router = express.Router();

import {
  getApplications,
  applyJobApplication,
} from "../Controller/Application.controller.js";

router.get("/getData", getApplications);

router.post("/applyJob", applyJobApplication);

export default router;
