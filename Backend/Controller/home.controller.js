import JobPost from "../Models/Hr_Models/Jobs.model.js";
import { errorHandler } from "../utils/Error.js";

export const homeData = async (req, res, next) => {
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

    const companies = await JobPost.aggregate([
      {
        $group: {
          _id: "$postedBy",
          jobCount: {
            $sum: 1,
          },
        },
      },
      { $sort: { jobCount: -1 } },
      { $limit: 4 },
    ]);

    const topCompanies = await JobPost.populate(companies, {
      path: "_id",
      model: "User",
      match: { userType: "recruiter" },
      populate: {
        path: "recruiterDetails",
        model: "Recruiter",
      },
    });

    res.status(200).json({ interestedJob, topCompanies });
  } catch (error) {
    console.log("Error in home interested jobs:", error);
    next(error);
  }
};
