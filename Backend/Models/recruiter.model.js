import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    position: {
      type: String,
      required: false, // Make this optional
    },
    department: {
      type: String,
      required: false, // Make this optional
    },
    companyAddress: {
      type: String,
      required: false, // Make this optional
    },
    companyName: {
      type: String,
      required: false, // Make this optional
    },
    contactNumber: {
      type: String,
      required: false, // Make this optional
    },
  },
  { timestamps: true }
);

const Recruiter = mongoose.model("Recruiter", recruiterSchema);

export default Recruiter;
