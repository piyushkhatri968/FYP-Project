import Application from "../Models/application.model.js";
import { errorHandler } from "../utils/Error.js";
import Candidate from "../Models/candidate.model.js";
import JobPost from "../Models/Hr_Models/Jobs.model.js";


export const getApplications = async (req, res, next) => {
  try {
    const { status, jobTitle, candidateName } = req.query; // Get filters from query params

    // Build dynamic query object
    const query = {};
    if (status) query.status = status; // Filter by application status
    if (jobTitle) query['jobId.title'] = { $regex: jobTitle, $options: "i" }; // Case-insensitive title search
    if (candidateName) {
      query['userId.userId.name'] = { $regex: candidateName, $options: "i" }; // Search candidate name
    }

    // Fetch applications with filters applied
    const applications = await Application.find(query)
      .populate({
        path: "userId", 
        populate: {
          path: "userId",
          select: "name email",
        },
      })
      .populate("jobId", "title description requirements");

    res.status(200).json({
      success: true,
      message: "Filtered job applications retrieved successfully",
      data: applications,
    });
  } catch (error) {
    next(error); // Pass errors to middleware
  }
};



// UpdateStatus: 
export const updateStatus=  async (req, res,next) => {
  const { id } = req.params; // Application ID
  const { status } = req.body; // New status: "Shortlisted" or "Rejected"

  // Validate status
  if (!["Applied", "Shortlisted", "Rejected"].includes(status)) {
    return res.status(400).json({ error: "Invalid status value." });
  }

  try {
    // Find the application and update its status
    const application = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ error: "Application not found." });
    }

    res.status(200).json({
      message: `Application status updated to ${status}.`,
      application,
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({ error: "Internal server error." });
    next(error)
  }
}     


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




