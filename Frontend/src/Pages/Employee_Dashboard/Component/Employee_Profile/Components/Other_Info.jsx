import React, { useEffect, useState } from "react";
import SkillInputEm from "../../SkillsInputEm";
import axios from "axios";
import { useSelector } from "react-redux";

const Other_Info = ({ userData }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    age: userData?.age || "",
    experience: userData?.experience || "",
    language: userData?.language || "",
    skills: userData?.skills || [], // Initialize skills from userData
  });
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState(userData);

  // Handle input changes for other fields
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Add a skill
  const handleSkillAdd = (skill) => {
    if (!formData.skills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
    }
  };

  // Remove a skill
  const handleSkillRemove = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  // Save changes (API call)
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/candidate/postData/${currentUser.candidateDetails}`,
        formData
      );
      if (response.status === 200) {
        setOriginalData(formData);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating other information:", error);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-[#001935] font-bold text-xl md:text-2xl">
        Other Information
      </h1>
      <div className="flex flex-col md:flex-row mt-3 md:mt-1 md:justify-center md:items-center gap-5">
        <div className="flex flex-col gap-2 md:mt-4 w-full">
          <label>Age</label>
          <input
            type="text"
            id="age"
            value={formData.age || ""}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Your Age"
            required
            className="border-gray-300 px-4 py-2.5 rounded-md md:w-78 placeholder:text-gray-500 placeholder:font-normal text-black font-semibold"
          />
        </div>
        <div className="flex flex-col gap-2 md:mt-4 w-full">
          <label>Work Experience</label>
          <input
            type="text"
            id="experience"
            value={formData?.experience || ""}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Work Experience"
            required
            className="border-gray-300 px-4 py-2.5 rounded-md md:w-78 placeholder:text-gray-500 placeholder:font-normal text-black font-semibold"
          />
        </div>
      </div>
      <div className="flex flex-col mt-3 md:justify-center md:items-center gap-5">
        <div className="flex flex-col gap-2 md:mt-4 w-full">
          <label>Language</label>
          <input
            type="text"
            id="language"
            value={formData.language || ""}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Language"
            required
            className="border-gray-300 px-4 py-2.5 rounded-md md:w-78 placeholder:text-gray-500 placeholder:font-normal text-black font-semibold"
          />
        </div>
        <div className="flex flex-col gap-2 md:mt-4 w-full">
          <SkillInputEm
            skills={formData.skills}
            onAdd={isEditing ? handleSkillAdd : undefined}
            onRemove={isEditing ? handleSkillRemove : undefined}
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

export default Other_Info;
