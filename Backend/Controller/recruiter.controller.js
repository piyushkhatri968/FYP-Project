import Recruiter from "../Models/recruiter.model.js";
import { errorHandler } from "../utils/Error.js";

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
