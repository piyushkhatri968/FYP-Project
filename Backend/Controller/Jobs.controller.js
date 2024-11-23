import JobPost from "../Models/Hr_Models/Jobs.model.js";
export const createJobPost = async (req, res) => {
  try {
    const newJobPost = new JobPost(req.body); // Destructuring the request body to create a new job post
    await newJobPost.save(); // Save the job post to the database
    res.status(201).json(newJobPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating job post", error: error.message });
  }
};

export const getJobPosts = async (req, res) => {
  try {
    const jobPosts = await JobPost.find({}); // Fetch all job posts from the database
    res.status(200).json(jobPosts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching job posts", error: error.message });
  }
};
