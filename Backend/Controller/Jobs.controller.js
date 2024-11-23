import JobPost from "../Models/Hr_Models/Jobs.model.js";
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
export const getJobPosts = async (req, res) => {
  try {
    const jobPosts = await JobPost.find({}); // Fetch all job posts from the database
    res.status(200).json({
      success: true,
      data: jobPosts,   
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching job posts",
      error: error.message,
    });
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
        message: 'Job not found',
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
      message: 'Error updating job',
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
    res.status(200).json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ success: false, message: "Error deleting job" });
  }
};


