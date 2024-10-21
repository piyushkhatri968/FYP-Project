import User from "../Models/user.model.js";
import { errorHandler } from "../utils/Error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { fullName, username, email, password } = req.body;

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
    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
      fullName: fullName.trim(),
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

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
