import express from "express";

import { signup, signin, signout } from "../Controller/Auth.controller.js";
const router = express.Router();
import { signupValidation } from "../ModelsValidation/signupSchemaValidate.js";

import { createJobPost } from "../Controller/Jobmangement.js";

router.post("/signup", signupValidation, signup);
router.post("/signin", signin);
router.post("/signout", signout);


export default router;
