import express from "express";
import { signup, signin, signout } from "../Controller/Auth.controller.js";
const router = express.Router();
import {
  signInValidation,
  signupValidation,
} from "../ModelsValidation/signupSchemaValidate.js";

router.post("/signup", signupValidation, signup);
router.post("/signin", signInValidation, signin);
router.post('/signout', signout)

export default router;
