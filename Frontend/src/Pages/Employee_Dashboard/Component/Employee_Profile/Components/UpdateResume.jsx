import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const UpdateResume = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [fileError, setFileError] = useState(null);
  const [userFileURL, setUserFileURL] = useState(null);
  const [userFile, setUserFile] = useState(null);
  const [uploading, setUploading] = useState(false);

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

  const uploadFile = async () => {
    const data = new FormData();
    data.append("file", userFile);
    data.append("upload_preset", "for_fyp_project");
    data.append("cloud_name", "dtfvymy9c");

    try {
      setUploading(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dtfvymy9c/raw/upload",
        data
      );
      setUploading(false);
      return response.data.secure_url;
    } catch (error) {
      setUploading(false);
      setFileError("Could not upload file");
      console.error("Error uploading file:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFileError(null)

    if (!userFile) {
      setFileError("Please select a file before saving.");
      return;
    }

    const uploadedURL = await uploadFile();
    if (!uploadedURL) return;

    try {
      const response = await axios.put(
        `http://localhost:8080/api/candidate/uploadResume/${currentUser.candidateDetails}`,
        { resume: uploadedURL }
      );

      if (response.status === 200) {
        setUserFileURL(uploadedURL);
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Resume upload error:", error);
      alert(error.response?.data?.message || "Failed to save resume.");
    }
  };

  return (
    <div className="flex flex-col mt-3">
      <h1 className="text-[#001935] font-bold text-xl md:text-2xl mb-4">
        Resume
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="w-full flex flex-col gap-4">
          <label htmlFor="resume">Upload Resume/CV</label>
          <input
            type="file"
            id="resume"
            accept=".doc,.docx,.pdf"
            className="border-gray-300 px-4 py-2.5 rounded-md md:w-78 placeholder:text-gray-500 placeholder:font-normal text-black font-semibold"
            onChange={handleFileChange}
          />
        </div>

        <button
          type="submit"
          className={`text-white py-2 w-24 rounded-md mt-6 transition-all duration-500 ${
            uploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-OrangeColor hover:bg-BlueColor"
          }`}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Save"}
        </button>
      </form>

      {fileError && (
        <div className="w-full text-red-600 bg-red-100 border border-red-600 my-3 p-2 rounded-md">
          {fileError}
        </div>
      )}
      {userFileURL && (
        <div className="w-full text-green-600 bg-green-100 border border-green-600 my-3 p-2 rounded-md">
          Resume uploaded successfully:{" "}
          <a
            href={userFileURL}
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            View File
          </a>
        </div>
      )}
    </div>
  );
};

export default UpdateResume;
