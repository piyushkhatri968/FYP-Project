import mongoose from "mongoose";


const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPost",
      required: true,
    },
    CandidateId:{
     type: mongoose.Schema.Types.ObjectId,
     ref: "Candidate",
     required: true,
    },
    status: {
      type: String,
      enum: ["Applied", "Shortlisted", "Rejected","Hired"],
      default: "Applied",
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
    // isShortlisted: { type: Boolean, default: false },
    notes: { type: String }, // For HR-specific comments
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
