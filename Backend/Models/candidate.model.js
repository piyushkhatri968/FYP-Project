import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Referencing the User model
      required: true,
    },
    position: {
      type: String,
    },
    phone: {
      type: String,
    },
    age: {
      type: Number,
    },
    location: {
      country: { type: String },
      city: { type: String },
      zipCode: { type: String },
    },
    skills: [{ type: String }], // Optional field to list candidate skills
    education: [
      {
        qualification: { type: String },
        specialization: { type: String },
        institution: { type: String },
      },
    ],
    experience: [
      {
        years: { type: Number },
        role: { type: String },
      },
    ],
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
