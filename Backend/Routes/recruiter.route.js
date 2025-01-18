import express from "express";
import { getRecruiterDetails,recruiterCompleteProfile,getRecruiterProfile } from "../Controller/recruiter.controller.js";
const router = express.Router();

router.get("/getRecruiterDetails/:id", getRecruiterDetails);
router.post("/completeProfile",recruiterCompleteProfile)

// Get recruiter profile
router.get("/profile/:userId", getRecruiterProfile);
export default router;
