import express from "express";
const router = express.Router();

import {
  updateUserInfo,
  getUserInfo,
  updateCandidateProfile,
  deleteUserAccount
} from "../Controller/user.controller.js";

router.get("/getUserInfo/:id", getUserInfo);
router.put("/updateInfo/:id", updateUserInfo);
router.put("/updateCandidateProfile/:id", updateCandidateProfile);

router.delete("/delete/:id", deleteUserAccount);

export default router;
