import Candidate from "../Models/candidate.model.js";
import User from "../Models/user.model.js";
import { errorHandler } from "../utils/Error.js";

export const saveResumeData = async (req, res, next) => {
  console.log(req.body);
  try {
    const {
      userId,
      userType,
      name,
      email,
      phone,
      location,
      position,
      experience,
      skills,
    } = req.body;

    if (!userId || userId === "No user") {
      return next(errorHandler(404, "You need to login first"));
    }
    if (userType === "recruiter") {
      return next(errorHandler(404, "Recruiter can not save this data"));
    }

    if (
      !name?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !position?.trim() ||
      !experience?.trim()
    ) {
      return next(errorHandler(400, "All fields are required"));
    }

    if (!Array.isArray(skills) || skills.length === 0) {
      return next(errorHandler(400, "At least one skill is required"));
    }

    const existingEmail = await User.findOne({
      email,
      _id: { $ne: userId },
    });
    if (existingEmail) {
      return next(errorHandler(400, "Email is already in use by another user"));
    }

    const updateUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );

    const updateCandidate = await Candidate.findByIdAndUpdate(
      updateUser.candidateDetails,
      { phone, location, position, experience, skills },
      { new: true }
    );

    res.status(200).json({ updateUser, message: "Data saved successfully" });
  } catch (error) {
    console.log("Error in saveResumeData:", error.message);
    next(error);
  }
};
