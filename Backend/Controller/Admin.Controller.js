import User from "../Models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/Error.js";

export const register = async (req, res, next) => {
  const { name, username, email, password } = req.body;

  try {
    if (!name || !username || !email || !password) {
      return next(errorHandler(400, "All fields are required"));
    }
    const existingEmail = await User.findOne({
      email: email.trim().toLowerCase(),
    });
    if (existingEmail) {
      return next(errorHandler(400, "User already exists with this email"));
    }

    const existingUsername = await User.findOne({ username: username.trim() });
    if (existingUsername) {
      return next(errorHandler(400, "User already exists with this username"));
    }
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create new user
    const newUser = new User({
      name: name.trim(),
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      userType: "Admin",
    });

    await newUser.save(); // Fixed save bug

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    // Add the token to the user's data
    newUser._doc.token = token;

    const { password: pass, ...rest } = newUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        samesite: "none",
      })
      .json({
        success: true,
        message: "Admin created successfully.",
        rest,
      });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    // Sort users by creation date (latest first)
    const users = await User.find({}).sort({ createdAt: -1 });

    const populatedUsers = await Promise.all(
      users.map(async (user) => {
        if (user.userType === "employee") {
          return await User.findById(user._id).populate("candidateDetails");
        } else if (user.userType === "recruiter") {
          return await User.findById(user._id).populate("recruiterDetails");
        } else {
          return user;
        }
      })
    );

    res.status(200).json({
      success: true,
      message: "All users fetched successfully.",
      users: populatedUsers,
    });
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    if (!user) {
      return next(errorHandler(404, "User not found."));
    }
    res.status(200).json({
      success: true,
      message: "Deleted successfully.",
    });
  } catch (error) {
    console.error("Error in deleting users:", error);
    next(error);
  }
};
