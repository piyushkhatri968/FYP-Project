import express from "express";
import { saveResumeData } from "../Controller/resumeAnalyzer.controller.js";

const router = express.Router();

router.put("/resume-data", saveResumeData);

export default router;
