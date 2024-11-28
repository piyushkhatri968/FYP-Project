import express from "express";
import { getRecruiterDetails } from "../Controller/recruiter.controller.js";
const router = express.Router();

router.get("/getRecruiterDetails/:id", getRecruiterDetails);

export default router;
