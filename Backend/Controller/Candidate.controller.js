import User from "../Models/user.model.js";
import Candidate from "../Models/candidate.model.js";
import { errorHandler } from "../utils/Error.js";

export const getCandidateDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
    const candidate = await User.findById(id)
      .lean()
      .populate("candidateDetails");
    if (!candidate) {
      return next(errorHandler(404, "User not found"));
    }
    res.status(200).json({ success: true, data: candidate });
  } catch (error) {
    console.log(error);
  }
};

export const postCandidateDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
    const candidate = await Candidate.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!candidate) {
      return next(errorHandler(404, "User not found"));
    }
    res.status(200).json({ success: true, data: candidate });
  } catch (error) {
    console.log(error);
  }
};
