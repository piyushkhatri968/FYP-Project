import JobPost from "../Models/Hr_Models/Jobs.model.js";
import { errorHandler } from "../utils/Error.js";

export const interestedJobs = async (req, res, next) => {
  try {
    const interestedJob = await JobPost.find({})
      .populate({
        path: "postedBy",
        model: "User",
        populate: {
          path: "recruiterDetails",
          model: "Recruiter",
        },
      })
      .sort({ createdAt: -1 })
      .limit(8);

    if (!interestedJob) {
      return next(errorHandler(404, "No jobs found."));
    }
    res.status(200).json(interestedJob);
  } catch (error) {
    console.log("Error in home interested jobs:", error);
    next(error);
  }
};
