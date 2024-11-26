import Application from "../Models/application.model.js";
import { errorHandler } from "../utils/Error.js";
import Candidate from "../Models/candidate.model.js";
import JobPost from "../Models/Hr_Models/Jobs.model.js";

export const getApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ jobId: req.params.jobId })
      .populate("userId", "name email skills") // Populate user details
      .populate("jobId", "title"); // Optional: Populate job details
    if (!applications) {
      return next(errorHandler(404, "Application not found"));
    }
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
};

export const applyJobApplication = async (req, res, next) => {
  const { userId, jobId } = req.body;

  try {
    if (!userId || !jobId) {
      return next(errorHandler(400, "User ID and Job ID are required"));
    }

    const job = await JobPost.findById(jobId);
    if (!job) {
      return next(errorHandler(404, "Job not found"));
    }

    const user = await Candidate.findById(userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    // Check for duplicate application
    const existingApplication = await Application.findOne({ userId, jobId });
    if (existingApplication) {
      return next(errorHandler(400, "You have already applied for this job"));
    }

    const applyJob = new Application({ userId, jobId });
    await applyJob.save();

    // Update Candidate's appliedJobs array
    await Candidate.findByIdAndUpdate(
      userId,
      { $addToSet: { appliedJobs: jobId } }, // Prevent duplicates
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Application Submitted",
      data: applyJob,
    });
  } catch (error) {
    next(error); // Pass errors to error-handling middleware
  }
};
