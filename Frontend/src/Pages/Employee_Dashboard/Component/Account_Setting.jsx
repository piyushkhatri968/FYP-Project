import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Alert } from "flowbite-react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import defaultImage from "../../../assets/Images/Avatar.png";

const Account_Setting = ({ userData }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState([]);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);

  const filePickerRef = useRef();

  //! image logics -------------------------------

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      setImageFileUploadError("File must be an image.");
      setImageFile(null);
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      // 2MB size limit
      setImageFileUploadError("File size must be less than 2MB.");
      setImageFile(null);
      return;
    }
    setImageFileUploadError(null);
    setImageFileUploading(true);
    if (file) {
      setImageFile(file)
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    setImageFileUploadError(null);
    if (!imageFile) {
      return null
    }
    setImageFileUploading(true)
    const data = new FormData()
    data.append("file", imageFile)
    data.append("upload_preset", "for_fyp_project")
    data.append("cloud_name", "dtfvymy9c")

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dtfvymy9c/image/upload", data)
      setImageFileUrl(response.data.secure_url)
      setFormData({ ...formData, profilePicture: response.data.secure_url })
      setImageFileUploading(false)
      console.log(response.data.secure_url)
    } catch (error) {
      setImageFileUploadError("Could not upload image");
      setImageFile(null);
      setImageFileUrl(null);
      setImageFileUploading(false);
      console.error("Error uploading image:", error);
    }
  }

  useEffect(() => {
    if (imageFile) {
      uploadImage()
    }
  }, [imageFile])

  //! ------------------------------------------------



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
  }, [currentUser])

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setUpdateUserError(null)
    setUpdateUserSuccess(null)

    if (formData.name === "" || formData.email === "" || formData.username === "" || formData.password === "") {
      setUpdateUserSuccess(null)
      setUpdateUserError("Field can not be empty")
      return
    }
    // Check if data has changed
    const hasChanges = Object.keys(formData).some(
      (key) => formData[key] !== originalData[key]
    );

    if (!hasChanges) {
      setUpdateUserSuccess(null);
      setUpdateUserError("No any changes made");
      return;
    }

    if (imageFileUploading) {
      setUpdateUserError("Please wait for the image to upload")
    }
    try {
      const response = await axios.put(
        `http://localhost:8080/api/user/updateCandidateProfile/${currentUser._id}`,
        formData
      );
      if (response) {
        setTimeout(() => {
          window.location.reload(false)
        }, 1000);
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
    setImageFile(null); // Clear the new image file
    setImageFileUrl(currentUser.profilePicture); // Reset to the original image
    setFormData(originalData); // Reset form data
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
  };




  return (
    <div className="p-6 min-h-screen shadow-2xl rounded-2xl w-full">
      <h1 className="text-2xl font-bold mb-6 text-center">Account Settings</h1>

      <form onSubmit={handleSubmitForm}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          className="hidden"
          disabled={!isEditing}
        />
        <div className="w-full flex justify-center items-center flex-col">
          <img
            src={(imageFileUrl && imageFileUrl) || currentUser.profilePicture || defaultImage}
            className={`rounded-full w-32 h-32 object-cover border-8 border-[lightgray] mb-4 ${imageFileUploading && "opacity-60"}`}
            alt="user"
            draggable="false"
            onClick={() => filePickerRef.current.click()}
          />
          {imageFileUploadError && (
            <div className="w-full flex justify-center mt-5">
              <Alert color="failure" className="w-full max-w-lg text-center">
                {imageFileUploadError}
              </Alert>
            </div>
          )}
          <div className="flex flex-col gap-2 md:mt-4 w-full max-w-lg">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Your name"
              value={formData.name || ""}
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
              value={formData.username || ""}
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
              value={formData.email || ""}
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
            <button className="w-full max-w-lg bg-[#010c29eb] text-center text-white font-semibold p-2 mt-4 rounded-md hover:bg-[#010C29] transition-all duration-300" disabled={imageFileUploading}>
              {imageFileUploading ? "Uploading Image " : "Update"}
            </button>
          ) : (
            <div className="w-full max-w-lg bg-OrangeColor text-center text-white font-semibold p-2 mt-4 rounded-md hover:bg-[#ff3737] transition-all duration-300 cursor-pointer" onClick={() => setIsEditing(true) || setUpdateUserError(null) || setUpdateUserSuccess(null)}>
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
