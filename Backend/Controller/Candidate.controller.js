import Candidate from "../Models/candidate.model.js";
import { errorHandler } from "../utils/Error.js";

export const getCandidateDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await Candidate.findById(id);
    if (!data) {
      return next(errorHandler(404, "User not found"));
    }
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    next(error);
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

export const getAppliedJobs = async (req, res, next) => {
  const { id } = req.params;
  try {
    const candidate = await Candidate.findById(id)
      .populate("appliedJobs")
    if (!candidate) {
      return next(errorHandler(404, "User not found"));
    }
    res.status(200).json({ success: true, data: candidate.appliedJobs });
  } catch (error) {
    next(error);
  }
};
