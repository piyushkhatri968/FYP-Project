import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Refers to the User model
    required: true,
  },
  contactNumber: { 
    type: String,
    required: true,
  },
  companyName: { 
    type: String,
    required: true,
  },
  companyAddress: { 
    type: String,
    required: true,
  },
  department: { 
    type: String,
    required: true,
  },
  position: { 
    type: String,
    required: true,
  },
  additionalDetailsFilled: { // To track if the form is completed
    type: Boolean,
    default: false,
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const Recruiter = mongoose.model("Recruiter", recruiterSchema);

export default Recruiter;
