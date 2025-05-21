import express from "express";
import { AdvanceJobSearch } from "../Controller/Searching.Controller.js";
const router = express.Router();

router.post("/job-seeker", AdvanceJobSearch);

export default router;
