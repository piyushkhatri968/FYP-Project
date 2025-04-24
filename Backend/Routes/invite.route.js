// routes/hr.routes.js
import express from "express";
import { inviteCandidateToJob} from "../Controller/jobinvite.controller.js";

const router = express.Router();

router.post("/invite", inviteCandidateToJob);




export default router;


