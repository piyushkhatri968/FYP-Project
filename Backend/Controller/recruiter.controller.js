import Recruiter from "../Models/recruiter.model.js";
import { errorHandler } from "../utils/Error.js";
import User from './../Models/user.model.js';
import mongoose from "mongoose";
export const getRecruiterDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
    const recruiter = await Recruiter.findById(id).populate("userId","name username email profilePicture"); // Populate userId with name, email, and profilePicture fields from User model
    if (!recruiter) {
      return next(errorHandler(404, "Recruiter not found"));
    }
    res.status(200).json({ success: true, data: recruiter });
  } catch (error) {
    next(error);
  }
};



export const recruiterCompleteProfile = async (req, res) => {
  try {
    const { userId, contactNumber, companyName, companyAddress, department, position, name, username, email, profilePicture } = req.body;

    if (!userId || !contactNumber || !companyName || !companyAddress || !department || !position) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingRecruiter = await Recruiter.findOne({ userId: new mongoose.Types.ObjectId(userId) });

    if (existingRecruiter) {
      existingRecruiter.contactNumber = contactNumber;
      existingRecruiter.companyName = companyName;
      existingRecruiter.companyAddress = companyAddress;
      existingRecruiter.department = department;
      existingRecruiter.position = position;
      existingRecruiter.additionalDetailsFilled = true;

      // Update user information (name, username, email, profilePicture) in the User collection
      const existingUser = await User.findById(userId);
      if (existingUser) {
        if (name) existingUser.name = name;
        if (username) existingUser.username = username;
        if (email) existingUser.email = email;
        if (profilePicture) existingUser.profilePicture = profilePicture; // Update only if provided

        await existingUser.save();
      }

      await existingRecruiter.save();
      return res.status(200).json({ message: "Recruiter profile updated successfully." });
    } else {
      const newRecruiter = new Recruiter({
        userId: new mongoose.Types.ObjectId(userId),
        contactNumber,
        companyName,
        companyAddress,
        department,
        position,
        additionalDetailsFilled: true,
      });

      const newUser = new User({
        _id: new mongoose.Types.ObjectId(userId),
        name,
        username,
        email,
        profilePicture,
      });

      await newUser.save();
      await newRecruiter.save();
      return res.status(201).json({ message: "Recruiter profile created successfully." });
    }
  } catch (error) {
    console.error("Error saving recruiter profile:", error);
    return res.status(500).json({ message: "An error occurred while saving the recruiter profile." });
  }
};








export const getRecruiterProfile = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from request params

    const recruiter = await Recruiter.findOne({ userId: new mongoose.Types.ObjectId(userId) }) 
      .populate("userId", "name username email profilePicture");

    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter profile not found." });
    }

    res.status(200).json(recruiter); // Sending recruiter data as response (with user populated)
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};


