import mongoose from "mongoose";

const jobSuggestionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate", required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "JobPost", required: true },
  matchScore: { type: Number},
  status: {
    type: String,
    enum: ["Suggested", "Invited", "Converted", "Ignored"],
    default: "Suggested",
  },
  convertedToApplication: { type: Boolean, default: false },
  suggestedAt: { type: Date, default: Date.now },
});

const JobSuggestion = mongoose.model("JobSuggestion", jobSuggestionSchema);
export default JobSuggestion;
