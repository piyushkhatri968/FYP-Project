import express from "express";

import {
  signup,
  signin,
  signout,
  getMe,
} from "../Controller/Auth.controller.js";
const router = express.Router();
import { signupValidation } from "../ModelsValidation/signupSchemaValidate.js";

router.post("/signup", signupValidation, signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.get("/getMe/:userId", getMe);

export default router;
