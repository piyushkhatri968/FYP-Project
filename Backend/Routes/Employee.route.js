import express from "express";
const router = express.Router();
import { addUserDetails } from "../Controller/employeeDetails.controller.js";

router.get("/addUserDetails", addUserDetails);

export default router;
