import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Alert } from "flowbite-react";
import defaultImage from "../../../assets/Images/Avatar.png";
const Account_Setting = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState([]); // Initialize with userData
  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const [originalData, setOriginalData] = useState([]); // Store original data

  const [updateUserError, setUpdateUserError] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user/getUserInfo/${currentUser._id}`)
        setFormData(response.data.data)
        setOriginalData(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUserData()
  }, [])

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (formData.name === "" || formData.email === "" || formData.username === "" || formData.password === "") {
      setUpdateUserSuccess(null)
      setUpdateUserError("Field can not be empty")
      return
    }
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
      if (response) {
        setIsEditing(false);
        setUpdateUserError(null);
        setUpdateUserSuccess("User updated successfully");
      }
    } catch (error) {
      setUpdateUserSuccess(null);
      console.log(error.response.data.message)
      setUpdateUserError(error.response.data.message);
    }
  };

  // Handle Cancel button click
  const handleCancelClick = () => {
    setIsEditing(false); // Exit editing mode
    setFormData(originalData)
    setUpdateUserError(null)
    setUpdateUserSuccess(null)
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
              value={formData.name}
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
              value={formData.username}
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
              value={formData.email}
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
              placeholder="password"
              onChange={handleFormChange}
              className="border-gray-300 px-4 py-2.5 rounded-md md:w-78  text-black font-semibold"
              disabled={!isEditing}
            />

          </div>
          {isEditing ? (
            <button className="w-full max-w-lg bg-[#010c29eb] text-center text-white font-semibold p-2 mt-4 rounded-md hover:bg-[#010C29] transition-all duration-300">
              Update
            </button>
          ) : (
            <div className="w-full max-w-lg bg-OrangeColor text-center text-white font-semibold p-2 mt-4 rounded-md hover:bg-[#ff3737] transition-all duration-300 cursor-pointer" onClick={() => setIsEditing(true)}>
              Edit
            </div>
          )}

          {isEditing && <div className="w-full max-w-lg bg-red-700 text-center text-white font-semibold p-2 mt-4 rounded-md hover:bg-[#ff3737] transition-all duration-300 cursor-pointer" onClick={handleCancelClick}>
            Cancel
          </div>}

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
