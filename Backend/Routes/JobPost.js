import express from "express";

const router = express.Router();

import { createJobPost } from "../Controller/Jobmangement.js";

router.post("/", createJobPost);

export default router;
