import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Basic_Info = ({ userData }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState(userData); // Initialize with userData
  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const [originalData, setOriginalData] = useState(userData); // Store original data
  const [fileError, setFileError] = useState(null);
  const [userFile, setUserFile] = useState(null);
  const [userFileUploading, setUserFileUploading] = useState(false);
  const [userFileURL, setUserFileURL] = useState(null);

  //! RESUME UPLOAD LOGIC
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setFileError("File size must be less than 2MB.");
        setUserFile(null);
        return;
      }
      setUserFile(file);
      // setUserFileURL(URL.createObjectURL(file));
    }
  };

  const uploadFile = async () => {
    setFileError(null);
    if (!userFile) {
      return null;
    }

    const data = new FormData();
    data.append("file", userFile);
    data.append("upload_preset", "for_fyp_project");
    data.append("cloud_name", "dtfvymy9c");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dtfvymy9c/image/upload",
        data
      );
      const fileUrl = response.data.secure_url;
      setUserFileURL(fileUrl);
      return fileUrl; // Return the file URL
    } catch (error) {
      setFileError("Could not upload file");
      setUserFile(null);
      setUserFileURL(null);
      console.log("Error uploading file:", error);
      return null;
    }
  };

  // Handle input changes
  const handleChangeFormInputs = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle Edit button click
  const handleEditClick = () => {
    setOriginalData(formData); // Save current state to allow cancel
    setIsEditing(true);
  };

  // Handle Save button click
  const handleSaveClick = async () => {
    try {
      // Upload the file if it exists
      if (userFile) {
        setUserFileUploading(true);
        const fileUrl = await uploadFile(); // Call uploadFile and get the URL
        setFormData((prev) => ({
          ...prev,
          resume: fileUrl, // Update formData with the file URL
        }));
      }

      // Make PUT request to update data
      await axios.put(
        `http://localhost:8080/api/candidate/postData/${currentUser.candidateDetails}`,
        formData
      );

      setIsEditing(false); // Exit editing mode
    } catch (error) {
      console.error("Error saving data:", error.message);
    } finally {
      setUserFileUploading(false);
    }
  };

  // Handle Cancel button click
  const handleCancelClick = () => {
    setFormData(originalData); // Revert to original data
    setIsEditing(false); // Exit editing mode
    setUserFile(null); // Clear the file
    setUserFileURL(null); // Clear the file URL
    setFileError(null); // Clear any file errors
  };

  return (
    <div className="flex flex-col mt-3">
      <h1 className="text-[#001935] font-bold text-xl md:text-2xl">
        Basic Information
      </h1>
      <form>
        <div className="flex flex-col md:flex-row mt-3 md:justify-center md:items-center gap-5">
          <div className="flex flex-col gap-2 md:mt-4 w-full">
            <label>Your Phone</label>
            <input
              type="text"
              placeholder="Your Phone"
              className="border-gray-300 px-4 py-2.5 rounded-md md:w-78 placeholder:text-gray-500 placeholder:font-normal text-black font-semibold"
              id="phone"
              value={formData.phone || ""}
              onChange={handleChangeFormInputs}
              disabled={!isEditing} // Disable input when not editing
            />
          </div>
          <div className="flex flex-col gap-2 md:mt-4 w-full">
            <label>Job Title</label>
            <input
              type="text"
              placeholder="Job Title"
              className="border-gray-300 px-4 py-2.5 rounded-md md:w-78 placeholder:text-gray-500 placeholder:font-normal text-black font-semibold"
              id="position"
              value={formData.position || ""}
              onChange={handleChangeFormInputs}
              disabled={!isEditing} // Disable input when not editing
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 md:mt-4 w-full">
          <label>CV / Resume</label>
          <input
            type="file"
            id="resume"
            accept=".doc, .docs, .pdf"
            className="border-gray-300 px-4 py-2.5 rounded-md md:w-78 placeholder:text-gray-500 placeholder:font-normal text-black font-semibold"
            onChange={handleFileChange}
            disabled={!isEditing || userFileUploading}
          />
          {userFileUploading && <p>Uploading file...</p>}
          {fileError && <p className="text-red-500">{fileError}</p>}
          {userFileURL && (
            <a href={userFileURL} target="_blank" rel="noopener noreferrer">
              View Uploaded File
            </a>
          )}
        </div>
        <div className="flex gap-3 mt-5">
          {!isEditing ? (
            <button
              type="button"
              className="text-white bg-OrangeColor py-2 w-24 rounded-md hover:bg-BlueColor transition-all duration-500"
              onClick={handleEditClick}
            >
              Edit
            </button>
          ) : (
            <>
              <button
                type="button"
                className="text-white bg-OrangeColor py-2 w-24 rounded-md hover:bg-BlueColor transition-all duration-500"
                onClick={handleSaveClick}
              >
                Save
              </button>
              <button
                type="button"
                className="text-white bg-gray-500 py-2 w-24 rounded-md hover:bg-gray-700 transition-all duration-500"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Basic_Info;