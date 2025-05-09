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
// ======================================Piyush Code==================================================
export const postCandidateDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
    const candidate = await Candidate.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!candidate) {
      return next(errorHandler(404, "User not found"));
    }
    console.log(candidate)
    res.status(200).json({ success: true, data: candidate });
  } catch (error) {
    console.log(error);
  }
};

// ======================================Piyush Code==================================================

// ==========================================babar's code==========================================

// ==========================================babar's code==========================================









export const getAppliedJobs = async (req, res, next) => {
  const { id } = req.params;
  try {
    const candidate = await Candidate.findById(id).populate({
      path: "appliedJobs",
      model: "JobPost",
      populate: {
        path: "postedBy",
        model: "User",
      },
    });
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
    const candidate = await Candidate.findById(id).populate({
      path: "favorites",
      model: "JobPost",
      populate: {
        path: "postedBy",
        model: "User",
      },
    });
    if (!candidate) {
      return next(errorHandler(404, "User not found"));
    }
    res.status(200).json({ success: true, data: candidate });
  } catch (error) {
    next(error);
  }
};
// aa
export const toggleFavoriteJob = async (req, res, next) => {
  const { userId, jobId } = req.body;

  try {
    // Validate input
    if (!userId || !jobId) {
      return next(errorHandler(400, "User ID and Job ID are required"));
    }

    // Find the candidate by userId
    const user = await Candidate.findById(userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    // Check if the job is already in favorites
    const isFavorite = user.favorites.includes(jobId);

    if (isFavorite) {
      // Remove job from favorites
      user.favorites = user.favorites.filter(
        (favoriteJobId) => favoriteJobId.toString() !== jobId
      );
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Job removed from favorites",
      });
    } else {
      // Add job to favorites
      user.favorites.push(jobId);
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Job added to favorites",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getFavorites = async (req, res, next) => {
  const { userId } = req.query;

  try {
    if (!userId) {
      return next(errorHandler(400, "User ID is required"));
    }

    const user = await Candidate.findById(userId).populate("favorites");
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    // Send the user's favorites as response
    res.status(200).json({
      success: true,
      favorites: user.favorites.map((job) => job._id), // Only send job IDs
    });
  } catch (error) {
    next(error);
  }
};

export const uploadResume = async (req, res, next) => {
  const { id } = req.params;
  const { resume } = req.body;

  if (!resume) {
    return next(errorHandler(400, "Resume URL is required."));
  }

  try {
    const updatedResume = await Candidate.findByIdAndUpdate(
      id,
      { resume: resume },
      { new: true } // Return the updated document
    );

    if (!updatedResume) {
      return next(errorHandler(404, "Candidate not found."));
    }

    return res.status(200).json({
      message: "Resume updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};
