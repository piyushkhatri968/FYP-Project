import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://www.shutterstock.com/shutterstock/photos/2281862025/display_1500/stock-vector-vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-2281862025.jpg",
    },
    userType: {
      type: String,
      enum: ["employee", "recruiter", "Admin"],
      required: true,
    },
    candidateDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
    },
    recruiterDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recruiter",
    },
  },
  { timestamps: true }
);
// 🔥 Middleware to clean up corresponding data
userSchema.pre("findOneAndDelete", async function (next) {
  const user = await this.model.findOne(this.getQuery());

  if (!user) return next();

  try {
    if (user.role === "Candidate" && user.candidateDetails) {
      await Candidate.findByIdAndDelete(user.candidateDetails);
    } else if (user.role === "Recruiter" && user.recruiterDetails) {
      await Recruiter.findByIdAndDelete(user.recruiterDetails);
    }
    next();
  } catch (error) {
    next(error);
  }
});

const User = new mongoose.model("User", userSchema);

export default User;
