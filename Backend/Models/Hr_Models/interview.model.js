const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidate", // candidate model
    required: true,
  },
  interviewDate: {
    type: Date,
    required: true,
  },
  interviewTime: {
    type: String,
    required: true,
  },
  interviewType: {
    type: String,
    enum: ["Technical", "HR", "Managerial", "Behavioral", "Case Study", "Panel"],
    required: true,
  },
  interviewMode: {
    type: String,
    enum: ["In-person", "Virtual"],
    required: true,
  },
  location: {
    type: String,
    required: function () {
      return this.interviewMode === "In-person";
    },
  },
  interviewers: {
    type: [String], // An array of interviewers' names or emails
    required: true,
  },
  jobComments: {
    type: String,
    default: "",
  },
  candidateConfirmation: {
    type: Boolean,
    default: false,
  },
});

const Interview = mongoose.model("Interview", interviewSchema);

export default Interview;
