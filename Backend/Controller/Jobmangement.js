import JobPost from "../Models/Hr_Models/JobPost.js"; 
export const createJobPost = async (req, res) => {
  try {
    const newJobPost = new JobPost(req.body); // Destructuring the request body to create a new job post
    await newJobPost.save(); // Save the job post to the database
    res.status(201).json(newJobPost); 
  } catch (error) {
    res.status(500).json({ message: 'Error creating job post', error: error.message });
  }
};
