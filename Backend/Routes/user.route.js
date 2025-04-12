import express from "express";
const router = express.Router();

import {
  updateUserInfo,
  getUserInfo,
  updateCandidateProfile,
} from "../Controller/user.controller.js";

router.get("/getUserInfo/:id", getUserInfo);
router.put("/updateInfo/:id", updateUserInfo);
router.put("/updateCandidateProfile/:id", updateCandidateProfile);

export default router;
