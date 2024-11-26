import Application from "../Models/application.model.js";






export const getApplications = async (req, res) => {
    try {
        const applications = await Application.find({ jobId: req.params.jobId })
          .populate("userId", "name email skills") // Populate user details
          .populate("jobId", "title"); // Optional: Populate job details
        res.status(200).json(applications);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch applications" });
      }
  };