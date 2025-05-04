import User from "../Models/user.model.js";
import { errorHandler } from "../utils/Error.js";
import bcryptjs from "bcryptjs";

// import User from "../Models/user.model.js";
import JobPost from "../Models/Hr_Models/Jobs.model.js";
import Recruiter from "../Models/recruiter.model.js";

export const getUserInfo = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate("candidateDetails");
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const { password: pass, ...rest } = user._doc;
    res.status(200).json({
      success: true,
      data: rest,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserInfo = async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;

  try {
    if (!name || name.trim() === "") {
      return next(errorHandler(400, "Name is required"));
    }
    const user = await User.findByIdAndUpdate(
      id,
      { name: name.trim() },
      { new: true }
    );
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const { password: pass, ...rest } = user._doc;
    res.status(200).json({
      success: true,
      data: rest,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCandidateProfile = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const { name, username, email, password } = req.body;

    // Validate fields
    if (name && name.trim() === "") {
      return next(errorHandler(400, "Name is required"));
    }
    if (email && email.trim() === "") {
      return next(errorHandler(400, "Email is required"));
    }

    if (password && password.length < 6) {
      return next(errorHandler(400, "Password must be at least 6 characters"));
    }
    if (username) {
      if (username.length < 5 || username.length > 20) {
        return next(
          errorHandler(400, "Username must be between 5 and 20 characters")
        );
      }
      if (username.includes(" ")) {
        return next(errorHandler(400, "Username cannot contain spaces"));
      }
      if (username !== username.toLowerCase()) {
        return next(errorHandler(400, "Username must be lowercase"));
      }
      if (!/^[a-zA-Z0-9]+$/.test(username)) {
        return next(
          errorHandler(400, "Username can only contain letters and numbers")
        );
      }
    }

    // Hash password if it exists
    let hashedPassword;
    if (password) {
      hashedPassword = await bcryptjs.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: hashedPassword,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return next(errorHandler(404, "User not found"));
    }

    const { password: pass, ...rest } = updatedUser._doc;
    res.status(200).json({
      success: true,
      data: rest,
    });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Internal Server Error"));
  }
};


export const deleteUserAccount = async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    // Delete all jobs posted by the user
    await JobPost.deleteMany({ postedBy: userId });

    // If the user is a recruiter, delete recruiter profile
    if (user.userType === "recruiter") {
      await Recruiter.deleteOne({ userId });
    }

    // Delete the user
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User and associated jobs deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error while deleting account." });
  }
};
