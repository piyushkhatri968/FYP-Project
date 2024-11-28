import JobPost from "../Models/Hr_Models/Jobs.model.js";
import Candidate from "../Models/candidate.model.js";

export const createJobPost = async (req, res) => {
  try {
    const newJobPost = new JobPost(req.body); // Destructuring the request body to create a new job post
    await newJobPost.save(); // Save the job post to the database
    // Return a success response with the job post data
    res.status(201).json({
      success: true,
      message: "Job post created successfully",
      jobPost: newJobPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating job post",
      error: error.message,
    });
  }
};

export const getJobPosts = async (req, res, next) => {
  const { userId } = req.query;

  try {
    let appliedJobs = [];
    if (userId) {
      const user = await Candidate.findById(userId).select("appliedJobs");
      if (user) appliedJobs = user.appliedJobs;
    }

    // Fetch job posts excluding applied jobs, and sort by creation date (latest first)
    const jobs = await JobPost.find({
      _id: { $nin: appliedJobs }, // Exclude applied jobs
    }).sort({ createdAt: -1 }).populate("postedBy")

    res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};


// edit jobs:
export const editJobPost = async (req, res) => {
  const { id } = req.params; // Get job ID from URL
  const updatedData = req.body; // Get updated job data from the request body

  try {
    // Find and update the job in the database
    const job = await JobPost.findByIdAndUpdate(id, updatedData, { new: true });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({
      success: false,
      message: "Error updating job",
      error: error.message,
    });
  }
};

// delete the job.

export const deleteJobPost = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await JobPost.findByIdAndDelete(id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ success: false, message: "Error deleting job" });
  }
};
