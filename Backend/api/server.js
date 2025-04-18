import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5000"],
    credentials: true,
  })
);
app.use(express.json());

//routes
import authRoute from "../Routes/Auth.route.js";
import jobRoute from "../Routes/Jobs.route.js";
import candidateRoute from "../Routes/candidate.route.js";
import userRoute from "../Routes/user.route.js";
import applicationRoute from "../Routes/Application.route.js";
import recruiterRoute from "../Routes/recruiter.route.js";
import adminRoute from "../Routes/Admin.route.js";

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("App connected to the Database");
  })
  .catch((error) => {
    console.log("Error connecting to Database", error);
  });

app.get("/", (req, res) => {
  res.status(200).json("FYP PROJECT");
});

// routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/candidate", candidateRoute);
app.use("/api/application/candidate", applicationRoute);
app.use("/api/recruiter", recruiterRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/admin", adminRoute);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
