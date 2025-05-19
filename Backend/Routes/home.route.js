import express from "express";
import { interestedJobs } from "../Controller/home.controller.js";

const router = express.Router();

router.get("/interestedJobs", interestedJobs);

export default router;
