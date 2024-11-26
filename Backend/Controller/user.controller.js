import User from "../Models/user.model.js";
import { errorHandler } from "../utils/Error.js";

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
