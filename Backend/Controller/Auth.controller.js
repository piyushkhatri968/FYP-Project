import User from "../Models/user.model.js";
import Candidate from "../Models/candidate.model.js";
import Recruiter from "../Models/recruiter.model.js";
import { errorHandler } from "../utils/Error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const {
    name,
    username,
    email,
    password,
    userType,
    position,
    department,
    companyAddress,
    companyName,
    contactNumber,
  } = req.body;

  try {
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

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
      name: name.trim(),
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      userType: userType,
    });

    const savedUser = await newUser.save();

    let savedCandidate = null;
    if (userType === "employee") {
      // Only save candidate details if userType is "employee"
      const newCandidate = new Candidate({ userId: savedUser._id });
      savedCandidate = await newCandidate.save();
      savedUser.candidateDetails = savedCandidate._id;
      await savedUser.save();
    }

    let savedRecruiter = null;
    if (userType === "recruiter") {
      // Only save recruiter details if userType is "recruiter"
      const newRecruiter = new Recruiter({
        userId: savedUser._id,
        position: position, // Added recruiter fields
        department: department,
        companyAddress: companyAddress,
        companyName: companyName,
        contactNumber: contactNumber,
      });
      savedRecruiter = await newRecruiter.save();
      savedUser.recruiterDetails = savedRecruiter._id;
      await savedUser.save();
    }

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
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Password"));
    }
    // Generate JWT token
    const token = jwt.sign(
      {
        id: validUser._id,
        email: validUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        samesite: "none",
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json("User has been signout");
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  const { userId } = req.params;
  try {
    if (!userId) {
      return next(errorHandler(400, "UserId is required."));
    }
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "User not exist."));
    }
    res.status(200).json({
      success: true,
      message: "User is available",
      user,
    });
  } catch (error) {
    next(error);
  }
};
