import express from "express";
const router = express.Router();

import { updateUserInfo, getUserInfo } from "../Controller/user.controller.js";

router.get("/getUserInfo/:id", getUserInfo);
router.put("/updateInfo/:id", updateUserInfo);

export default router;
