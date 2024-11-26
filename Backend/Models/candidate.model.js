import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Refers to the User model
      required: true,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobPost", // Referencing the JobPost model
      },
    ],
    appliedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobPost", // Referencing the JobPost model
      },
    ],
    position: {
      type: String,
    },
    phone: {
      type: Number,
    },
    language: {
      type: String,
    },
    age: {
      type: Number,
    },
    location: {
      country: { type: String },
      city: { type: String },
      zipCode: { type: Number },
      province: { type: String },
    },

    skills: {
      type: [String], // An array of strings for skills
    },
    education: [
      {
        qualification: { type: String },
        specialization: { type: String },
        institution: { type: String },
      },
    ],
    experience: {
      type: String,
    },
    resume: {
      type: String, // URL to the resume
    },
    socialLinks: {
      linkedIn: { type: String },
      github: { type: String },
    },
  },
  { timestamps: true }
);

const Candidate = mongoose.model("Candidate", candidateSchema);

export default Candidate;
