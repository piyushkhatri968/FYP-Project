import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Alert } from "flowbite-react";
import { Avatar } from "flowbite-react";
import defaultImage from "../../../assets/Images/Avatar.png";
const Account_Setting = ({ userData }) => {
  console.log(userData);
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState(userData); // Initialize with userData
  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const [originalData, setOriginalData] = useState(userData); // Store original data
  const [loading, setLoading] = useState(false);

  const [updateUserError, setUpdateUserError] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleEditClick = () => {
    setOriginalData(formData); // Save current state to allow cancel
    setIsEditing(true);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      setUpdateUserSuccess(null);
      setUpdateUserError("No any changes made");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:8080/api/user/updateCandidateProfile/${currentUser._id}`,
        formData
      );
      if (response.status === 200) {
        setIsEditing(false);
        setUpdateUserError(null);
        setUpdateUserSuccess("User updated successfully");
      }
    } catch (error) {
      setUpdateUserSuccess(null);
      setUpdateUserError("Some error accured");
    }
  };

  // Handle Cancel button click
  const handleCancelClick = () => {
    setFormData(originalData); // Revert to original data
    setIsEditing(false); // Exit editing mode
  };
  return (
    <div className="p-6 min-h-screen shadow-2xl rounded-2xl w-full">
      <h1 className="text-2xl font-bold mb-6 text-center">Account Settings</h1>

      <form onSubmit={handleSubmitForm}>
        <div className="w-full flex justify-center items-center flex-col">
          <img
            src={currentUser.profilePicture || defaultImage}
            className="w-32 h-32 rounded-full mb4"
            alt=""
          />
          <div className="flex flex-col gap-2 md:mt-4 w-full max-w-lg">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Your name"
              value={formData.name || userData.name}
              onChange={handleFormChange}
              className="border-gray-300 px-4 py-2.5 rounded-md md:w-78  text-black font-semibold"
              disabled={!isEditing}
            />
          </div>
          <div className="flex flex-col gap-2 md:mt-4 w-full max-w-lg">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={formData.username || currentUser.username}
              onChange={handleFormChange}
              className="border-gray-300 px-4 py-2.5 rounded-md md:w-78  text-black font-semibold"
              disabled={!isEditing}
            />
          </div>
          <div className="flex flex-col gap-2 md:mt-4 w-full max-w-lg">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={formData.email || currentUser.email}
              onChange={handleFormChange}
              className="border-gray-300 px-4 py-2.5 rounded-md md:w-78  text-black font-semibold"
              disabled={!isEditing}
            />
          </div>
          <div className="flex flex-col gap-2 md:mt-4 w-full max-w-lg">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="******"
              onChange={handleFormChange}
              className="border-gray-300 px-4 py-2.5 rounded-md md:w-78  text-black font-semibold"
              disabled={!isEditing}
            />
          </div>

          <button className="w-full max-w-lg bg-[#010c29eb] text-center text-white font-semibold p-2 mt-4 rounded-md hover:bg-[#010C29] transition-all duration-300">
            Update
          </button>

          <div className="flex justify-between items-center w-full max-w-lg mt-2">
            <span className="text-red-600 font-semibold cursor-pointer">
              Delete Account
            </span>
            <span className="text-red-600 font-semibold cursor-pointer">
              Sign Out
            </span>
          </div>
        </div>
      </form>
      {updateUserError && (
        <div className="w-full flex justify-center mt-5">
          <Alert color="failure" className="w-full max-w-lg text-center">
            {updateUserError}
          </Alert>
        </div>
      )}
      {updateUserSuccess && (
        <div className="w-full flex justify-center mt-5">
          <Alert color="success" className="w-full max-w-lg text-center">
            {updateUserSuccess}
          </Alert>
        </div>
      )}
    </div>
  );
};

export default Account_Setting;
