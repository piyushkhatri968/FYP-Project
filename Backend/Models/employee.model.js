import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userType: {
      type: String,
    },
    phone: { type: String, match: /^[0-9]{10,15}$/ },
    age: { type: Number },
    location: {
      country: { type: String },
      city: { type: String },
      zipCode: { type: String },
      region: { type: String },
    },
    skills: [{ type: String }],
    desiredRole: { type: String },
    resume: { type: String },
    preferredLocations: [{ type: String }],
    salaryExpectations: { type: String },
    availability: [{ type: String }],
    languages: [{ type: String }],
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
      },
    ],
    certifications: [{ type: String }],
    socialLinks: {
      linkedIn: { type: String },
      facebook: { type: String },
      github: { type: String },
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
