import express from "express";
import {
  deleteUser,
  getAllUsers,
  register,
} from "../Controller/Admin.Controller.js";

const router = express.Router();

router.post("/register", register);
router.get("/getUsers", getAllUsers);
// router.delete("/deleteUser/:id", deleteUser);

export default router;
