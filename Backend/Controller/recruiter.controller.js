import Recruiter from "../Models/recruiter.model.js";
import { errorHandler } from "../utils/Error.js";
import User from './../Models/user.model.js';
export const getRecruiterDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
    const recruiter = await Recruiter.findById(id).populate("userId");
    if (!recruiter) {
      return next(errorHandler(404, "Recruiter not found"));
    }
    res.status(200).json({ success: true, data: recruiter });
  } catch (error) {
    next(error);
  }
};

export const recruiterCompleteProfile=async (req, res) => {
  try {
    const { userId, contactNumber, companyName, companyAddress, department, position } = req.body;

    // Validate required fields
    if (!userId || !contactNumber || !companyName || !companyAddress || !department || !position) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the recruiter profile already exists
    const existingRecruiter = await Recruiter.findOne({ userId });

    if (existingRecruiter) {
      // Update the existing recruiter profile
      existingRecruiter.contactNumber = contactNumber;
      existingRecruiter.companyName = companyName;
      existingRecruiter.companyAddress = companyAddress;
      existingRecruiter.department = department;
      existingRecruiter.position = position;
      existingRecruiter.additionalDetailsFilled = true; // Mark as completed

      await existingRecruiter.save(); // Save updates to the database
      return res.status(200).json({ message: "Recruiter profile updated successfully." });
    } else {
      // Create a new recruiter profile
      const newRecruiter = new Recruiter({
        userId,
        contactNumber,
        companyName,
        companyAddress,
        department,
        position,
        additionalDetailsFilled: true, // Mark as completed
      });

      await newRecruiter.save(); // Save new profile to the database
      return res.status(201).json({ message: "Recruiter profile created successfully." });
    }
  } catch (error) {
    console.error("Error saving recruiter profile:", error);
    return res.status(500).json({ message: "An error occurred while saving the recruiter profile." });
  }
};


export const getRecruiterProfile= async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from request params

    const recruiter = await Recruiter.findOne({ userId }); // Find recruiter by userId

    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter profile not found." });
    }

    res.status(200).json(recruiter); // Send recruiter data as response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

