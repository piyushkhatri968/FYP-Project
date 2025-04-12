import JobPost from "../Models/Hr_Models/Jobs.model.js";
import Candidate from "../Models/candidate.model.js";
import User from "../Models/user.model.js"

export const createJobPost = async (req, res) => {
  try {
    let { title, description, location, skills } = req.body;
    let skill = skills.join(" ");
    const slug = (title + " " + description + " " + location + " " + skill)
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");
    const newJobPost = new JobPost({ ...req.body, slug }); // Destructuring the request body to create a new job post
    await newJobPost.save(); // Save the job post to the database
    // Return a success response with the job post data
    console.log(newJobPost);
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


// getting posted jobs:

export const getJobPosts = async (req, res, next) => {
  const { userId } = req.query;

  try {
    let appliedJobs = [];
    let jobs = [];

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required." });
    }

    // Find user details
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    if (user.userType === "recruiter") {
      // Check if recruiter has posted jobs
      jobs = await JobPost.find({ postedBy: userId }).sort({ createdAt: -1 }).populate("postedBy");

    } else if (user.userType === "candidate") {
      // Fetch candidate's applied jobs
      const candidate = await Candidate.findById(userId).select("appliedJobs");
      if (candidate) appliedJobs = candidate.appliedJobs;

      // Fetch job posts excluding applied jobs
      jobs = await JobPost.find({ _id: { $nin: appliedJobs } })
        .sort({ createdAt: -1 })
        .populate("postedBy");
    }

    res.status(200).json({
      success: true,
      data: jobs,
    });

  } catch (error) {
    next(error);
  }
};





// ************************************************************************8

// export const getJobPosts = async (req, res, next) => {
//   const { userId } = req.query;

//   try {
//     let appliedJobs = [];
//     if (userId) {


// const user = await Candidate.findById(userId).select("appliedJobs");
//       if (user) appliedJobs = user.appliedJobs;
//     }

//     // Fetch job posts excluding applied jobs, and sort by creation date (latest first)
//     const jobs = await JobPost.find({
//       _id: { $nin: appliedJobs }, // Exclude applied jobs
//     })
//       .sort({ createdAt: -1 })
//       .populate("postedBy");

//     res.status(200).json({
//       success: true,
//       data: jobs,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

//!-------------------------------------------------------------

export const getJobPostsRecommendation = async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }
    const user = await Candidate.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    let { position, skills } = user;
    let skillSearch = skills.join(" "); // Combine skills into a single string
    let userSlug = position + " " + skillSearch; // Create a search string based on user position and skills
    let appliedJobs = user.appliedJobs;
    const jobs = await JobPost.find({
      _id: { $nin: appliedJobs }, // Exclude applied jobs
      $or: [
        { title: { $regex: position, $options: "i" } }, // Search in title
        { description: { $regex: position, $options: "i" } }, // Search in description
        { skills: { $regex: position, $options: "i" } }, // Search matching skills array
        { location: { $regex: position, $options: "i" } }, // Search in location
        { title: { $regex: skillSearch, $options: "i" } }, // Search in title
        { description: { $regex: skillSearch, $options: "i" } }, // Search in description
        { skills: { $regex: skillSearch, $options: "i" } }, // Search matching skills array
        { location: { $regex: skillSearch, $options: "i" } }, // Search in location
        { title: { $regex: userSlug, $options: "i" } }, // Search in title
        { description: { $regex: userSlug, $options: "i" } }, // Search in description
        { skills: { $regex: userSlug, $options: "i" } }, // Search matching skills array
        { location: { $regex: userSlug, $options: "i" } }, // Search in location
      ],
    })
      .sort({ createdAt: -1 })
      .populate("postedBy");
    res.status(200).json({
      success: true,
      data: jobs,
      userSlug,
    });
  } catch (error) {
    next(error);
  }
};

//!-------------------------------------------------------------

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
