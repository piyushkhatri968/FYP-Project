import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Basic_Info = ({ userData }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState(userData); // Initialize with userData
  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const [originalData, setOriginalData] = useState(userData); // Store original data

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
      await axios.put(
        `http://localhost:8080/api/candidate/postData/${currentUser.candidateDetails}`,
        formData
      );
      setIsEditing(false); // Exit editing mode
    } catch (error) {
      console.error("Error saving data:", error.message);
    }
  };

  // Handle Cancel button click
  const handleCancelClick = () => {
    setFormData(originalData); // Revert to original data
    setIsEditing(false); // Exit editing mode
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
