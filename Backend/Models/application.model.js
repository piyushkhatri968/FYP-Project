import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  userId: {
   type: mongoose.Schema.Types.ObjectId, 
   ref: "Candidate",
   required: true 
},
  jobId: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: "JobPost", 
     required: true 
},
  status: { 
    type: String, 
    enum: ["Applied", "Shortlisted", "Rejected"], 
    default: "Applied" 
  },
  appliedAt: { 
    type: Date, 
    default: Date.now 
},
  notes: { type: String }, // For HR-specific comments
});

const Application= mongoose.model("Application", applicationSchema);

export default Application;