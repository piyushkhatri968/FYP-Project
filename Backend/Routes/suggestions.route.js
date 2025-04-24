import express from "express";
// import {suggestUserForJob} from "../controllers/suggestion.controller.js";
import { suggestUserForJob, inviteSuggestedUser } from "../Controller/suggestion.controller.js";
const router = express.Router();

router.post("/suggest", suggestUserForJob);
router.post("/invite", inviteSuggestedUser);

export default router;
