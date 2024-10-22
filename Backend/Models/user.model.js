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
      required: true,
      default: "Employee",
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);

export default User;
