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

  // When userData changes, update formData and originalData
  useEffect(() => {
    setFormData(userData);
    setOriginalData(userData);
  }, [userData]);

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setFileError("File size must be less than 2MB.");
        setUserFile(null);
        return;
      }
      setFileError(null);
      setUserFile(file);
    }
  };

  // Upload to Cloudinary
  const uploadFile = async () => {
    const data = new FormData();
    data.append("file", userFile);
    data.append("upload_preset", "for_fyp_project");
    data.append("cloud_name", "dtfvymy9c");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dtfvymy9c/raw/upload",
        data
      );
      return res.data.secure_url;
    } catch (err) {
      console.error("Upload Error:", err);
      setFileError("Could not upload file");
      return null;
    }
  };

  // Input field changes
  const handleChangeFormInputs = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Enable editing
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Save data
  const handleSaveClick = async () => {
    try {
      setUserFileUploading(true);

      let updatedData = { ...formData };

      if (userFile) {
        const fileUrl = await uploadFile();
        if (fileUrl) {
          updatedData.resume = fileUrl; // ✅ Correctly set new resume URL
          console.log("Resume URL updated to:", fileUrl);
        } else {
          return; // Exit if upload failed
        }
      }

      console.log("Sending updated data to backend:", updatedData);

      await axios.put(
        `http://localhost:8080/api/candidate/postData/${currentUser.candidateDetails}`,
        updatedData
      );

      setFormData(updatedData); // update local state
      setOriginalData(updatedData); // update original
      setIsEditing(false);
      setUserFile(null);
    } catch (err) {
      console.error("Error saving data:", err);
    } finally {
      setUserFileUploading(false);
    }
  };

  // Cancel edit
  const handleCancelClick = () => {
    setFormData(originalData);
    setIsEditing(false);
    setUserFile(null);
    setFileError(null);
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
              disabled={!isEditing}
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
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 md:mt-4 w-full">
          <label className="text-black font-semibold">CV / Resume</label>
          <input
            type="file"
            id="resume"
            accept=".doc, .docx, .pdf"
            className="border-gray-300 px-4 py-2.5 rounded-md md:w-78 placeholder:text-gray-500 placeholder:font-normal text-black font-semibold"
            onChange={handleFileChange}
            disabled={!isEditing || userFileUploading}
          />
          {userFileUploading && <p>Uploading file...</p>}
          {fileError && <p className="text-red-500">{fileError}</p>}
          {formData.resume && (
            <a
              href={formData.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mt-2"
            >
              View Current Resume
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
