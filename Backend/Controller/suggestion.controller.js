import JobSuggestion from "../Models/Hr_Models/JobSuggestions.model.js";
import Notification from "../Models/Hr_Models/Notification.model.js";
// import candidate from "../models/Candidate.js";
import Candidate from "../Models/candidate.model.js";
import nodemailer from "nodemailer";

// Suggest a user for a job (used by ML model or admin)
export const suggestUserForJob = async (req, res) => {
  const { jobId, userId, matchScore } = req.body;
  try {
    const existing = await JobSuggestion.findOne({ jobId, userId });
    if (existing) return res.status(409).json({ message: "User already suggested" });

    const suggestion = await JobSuggestion.create({ jobId, userId, matchScore });
    res.status(201).json(suggestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Invite a suggested user (trigger notification + email)
export const inviteSuggestedUser = async (req, res) => {
  const { jobId, userId } = req.body;

  try {
    await JobSuggestion.findOneAndUpdate(
      { jobId, userId },
      { status: "Invited" },
      { new: true }
    );

    // In-app notification
    await Notification.create({
      userId,
      message: "You've been invited to apply for a job that matches your profile!",
    });

    // Send email
    const user = await Candidate.findById(userId);
    if (user?.email) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "your-email@gmail.com", // replace with your email
          pass: "your-app-password", // use an app password
        },
      });

      const mailOptions = {
        from: "your-email@gmail.com",
        to: user.email,
        subject: "Job Invitation",
        text: "You’ve been invited to apply for a job that matches your profile. Please check your dashboard.",
      };

      await transporter.sendMail(mailOptions);
    }

    res.json({ message: "User invited and notified!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
