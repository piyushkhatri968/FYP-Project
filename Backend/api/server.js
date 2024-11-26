import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    // origin: "https://fyp-project-tiest.vercel.app", // Your frontend URL
    origin: "http://localhost:5173",
    credentials: true, // Allow credentials (cookies)
  })
);
app.use(express.json());

//routes
import authRoute from "../Routes/Auth.route.js";
import jobRoute from "../Routes/Jobs.route.js";
import candidateRoute from "../Routes/candidate.route.js";
import userRoute from "../Routes/user.route.js";
import applicationRoute from "../Routes/Application.route.js";

// {
//     origin: process.env.CLIENT_URL || "http://localhost:5173/", // Your frontend URL
//     credentials: true, // Allow credentials (cookies)
//   }

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

// AUTHENTICATION ROUTES
app.use("/api/auth", authRoute);

app.use("/api/user", userRoute);

// CANDIDATE INFORMATION ROUTES

app.use("/api/candidate", candidateRoute);

app.use("/api/application/candidate", applicationRoute )

// jobs Routes
app.use("/api/jobs", jobRoute);

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
