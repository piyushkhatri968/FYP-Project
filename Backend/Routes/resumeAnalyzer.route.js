import express from "express";
import { resumeAnalyze } from "../Controller/resumeAnalyzer.controller.js";

const router = express.Router();

router.post("/resume-analyzer", resumeAnalyze);

export default router;
