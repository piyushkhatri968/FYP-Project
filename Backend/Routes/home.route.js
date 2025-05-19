import express from "express";
import { homeData } from "../Controller/home.controller.js";

const router = express.Router();

router.get("/", homeData);

export default router;
