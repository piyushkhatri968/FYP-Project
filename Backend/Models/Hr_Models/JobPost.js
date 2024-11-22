// models/JobPost.js
import mongoose from 'mongoose';

const jobPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    skills: {
      type: [String], // An array of strings for skills
      required: true,
    },
    jobType: {
      type: String,
      required: true,
      enum: ['Full-Time', 'Part-Time', 'Contract','Remote'], 
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const JobPost= mongoose.model('JobPost', jobPostSchema);


export default JobPost
