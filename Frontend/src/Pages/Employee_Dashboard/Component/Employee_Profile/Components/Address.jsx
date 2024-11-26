import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Address = ({ userData }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState(userData?.location || {}); // Initialize with nested location data
  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const [originalData, setOriginalData] = useState(userData?.location || {}); // Store original nested data

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Save changes (perform API call)
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/candidate/postData/${currentUser.candidateDetails}`,
        {
          "location.city": formData.city,
          "location.country": formData.country,
          "location.province": formData.province,
          "location.zipCode": formData.zipCode,
        }
      );

      if (response.status === 200) {
        setIsEditing(false);
        setOriginalData(formData); // Update original data
      }
    } catch (error) {
      console.error("Error updating location:", error);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setFormData(originalData); // Revert changes
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-[#001935] font-bold text-xl md:text-2xl">Address</h1>
      <div className="flex flex-col md:flex-row mt-3 md:mt-1 md:justify-center md:items-center gap-5">
        <div className="flex flex-col gap-2 md:mt-4 w-full">
          <label>Your Country</label>
          <input
            type="text"
            id="country"
            value={formData.country || ""}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Your Country"
            className="border-gray-300 px-4 py-2.5 rounded-md md:w-78 placeholder:text-gray-500 placeholder:font-normal text-black font-semibold"
          />
        </div>
        <div className="flex flex-col gap-2 md:mt-4 w-full">
          <label>Your City</label>
          <input
            type="text"
            id="city"
            value={formData.city || ""}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Your City"
            className="border-gray-300 px-4 py-2.5 rounded-md md:w-78 placeholder:text-gray-500 placeholder:font-normal text-black font-semibold"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row mt-3 md:justify-center md:items-center gap-5">
        <div className="flex flex-col gap-2 md:mt-4 w-full">
          <label>Zip Code</label>
          <input
            type="number"
            id="zipCode"
            value={formData.zipCode || ""}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="City Zip"
            className="border-gray-300 px-4 py-2.5 rounded-md md:w-78 placeholder:text-gray-500 placeholder:font-normal text-black font-semibold"
          />
        </div>
        <div className="flex flex-col gap-2 md:mt-4 w-full">
          <label>Province</label>
          <input
            type="text"
            id="province"
            value={formData.province || ""}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Your Province"
            className="border-gray-300 px-4 py-2.5 rounded-md md:w-78 placeholder:text-gray-500 placeholder:font-normal text-black font-semibold"
          />
        </div>
      </div>
      <div className="flex gap-3 mt-5">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="text-white bg-OrangeColor py-2 w-24 rounded-md hover:bg-BlueColor transition-all duration-500"
          >
            Edit
          </button>
        ) : (
          <>
            <button
              onClick={handleSave}
              className="text-white bg-OrangeColor py-2 w-24 rounded-md hover:bg-BlueColor transition-all duration-500"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="text-white bg-gray-500 py-2 w-24 rounded-md hover:bg-gray-700 transition-all duration-500"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Address;
