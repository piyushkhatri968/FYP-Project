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
    const candidate = await Candidate.findById(id).populate("appliedJobs");
    if (!candidate) {
      return next(errorHandler(404, "User not found"));
    }
    res.status(200).json({ success: true, data: candidate.appliedJobs });
  } catch (error) {
    next(error);
  }
};

export const getSavedJobs = async (req, res, next) => {
  const { id } = req.params;
  try {
    const candidate = await Candidate.findById(id).populate("favorites");
    if (!candidate) {
      return next(errorHandler(404, "User not found"));
    }
    res.status(200).json({ success: true, data: candidate });
  } catch (error) {
    next(error);
  }
};

export const toggleFavoriteJob = async (req, res, next) => {
  const { userId, jobId } = req.body;

  try {
    if (!userId || !jobId) {
      return next(errorHandler(400, "User ID and Job ID are required"));
    }

    const user = await Candidate.findById(userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    // Check if the job is already a favorite
    const isFavorite = user.favorites.includes(jobId);

    if (isFavorite) {
      // Remove from favorites
      user.favorites = user.favorites.filter(
        (favoriteJobId) => favoriteJobId.toString() !== jobId
      );
    } else {
      // Add to favorites
      user.favorites.push(jobId);
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: isFavorite
        ? "Job removed from favorites"
        : "Job added to favorites",
    });
  } catch (error) {
    next(error);
  }
};
