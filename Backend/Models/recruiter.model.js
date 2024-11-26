import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Refers to the User model
    required: true,
  },
});

const Recruiter = new mongoose.model("Recruiter", recruiterSchema);

export default Recruiter;
