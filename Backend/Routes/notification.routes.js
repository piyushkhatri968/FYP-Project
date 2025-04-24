import express from "express";
import { getNotifications, markNotificationRead } from "../Controller/notification.controller.js";
const router = express.Router();

router.get("/:userId", getNotifications);
router.put("/:id/read", markNotificationRead);

export default router;
