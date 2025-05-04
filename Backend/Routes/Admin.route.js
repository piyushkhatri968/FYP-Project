import express from "express";
import {
  deleteUser,
  getAllJobs,
  getAllUsers,
  register,
  updateMe
} from "../Controller/Admin.Controller.js";

const router = express.Router();

router.post("/register", register);
router.get("/getUsers", getAllUsers);
router.delete("/deleteUser", deleteUser);
router.get("/allJobs", getAllJobs);
router.put("/updateMe/:id", updateMe)

export default router;
