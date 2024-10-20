import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: process.env.CLIENT_URL, // Your frontend URL
    credentials: true, // Allow credentials (cookies)
  })
);

app.get("/", (req, res) => {
  res.send("FYP PROJECT");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
