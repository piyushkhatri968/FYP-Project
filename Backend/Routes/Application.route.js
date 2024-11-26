import express from "express";

const router = express.Router();

import { getApplications } from "../Controller/Application.controller.js";




router.get("/getData", getApplications )


export default router;