import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "../../Redux/User/UserSlice";

const ResumeDataPopup = ({ setResumeDataSavePopup, resumeData }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    basic_info: {
      name: "",
      email: "",
      phone: "",
      location: "",
    },
    professional_info: {
      position: "",
      experience: "",
      skills: [],
    },
  });

  const [skillsInput, setSkillsInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Initialize form data when component mounts
  useEffect(() => {
    if (resumeData) {
      setFormData({
        basic_info: {
          name: resumeData.basic_info?.name || "",
          email: resumeData.basic_info?.email || "",
          phone: resumeData.basic_info?.phone || "",
          location: resumeData.basic_info?.location || "",
        },
        professional_info: {
          position: resumeData.professional_info?.position || "",
          experience: resumeData.professional_info?.experience || "",
          skills: [...(resumeData.professional_info?.skills || [])],
        },
      });
      setSkillsInput(resumeData.professional_info?.skills?.join(", ") || "");
    }
  }, [resumeData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split(".");

    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSkillsChange = (e) => {
    const value = e.target.value;
    setSkillsInput(value);

    const skillsArray = value
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    setFormData((prev) => ({
      ...prev,
      professional_info: {
        ...prev.professional_info,
        skills: skillsArray,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError(null);

    if (!currentUser) {
      setSaveError("You need to login first");
      setIsSaving(false);
      return;
    }
    if (currentUser?.usertType === "recruiter") {
      setSaveError("Recruiter can not save data");
      setIsSaving(false);
      return;
    }

    const location = {
      city: formData.basic_info.location,
    };

    try {
      dispatch(updateStart());
      const response = await axios.put(
        "http://localhost:8080/api/resume/resume-data",
        {
          userId: currentUser?._id || "No user",
          userType: currentUser?.userType,
          name: formData.basic_info.name,
          email: formData.basic_info.email,
          phone: formData.basic_info.phone,
          location,
          position: formData.professional_info.position,
          experience: formData.professional_info.experience,
          skills: formData.professional_info.skills,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setSaveSuccess(true);
        dispatch(updateSuccess(response.data.updateUser));
        setTimeout(() => {
          setResumeDataSavePopup(false);
        }, 1500);
      }
    } catch (err) {
      dispatch(updateFailure());
      setSaveError(err.response.data.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black/70 fixed top-0 left-0 z-50 p-4">
      <div className="w-full max-w-4xl max-h-[90vh] bg-white rounded-md shadow-xl overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Save Resume Data
            </h2>
            <button
              onClick={() => setResumeDataSavePopup(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["name", "email", "phone", "location"].map((field) => (
                  <div className="space-y-1" key={field}>
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {field}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={`basic_info.${field}`}
                      value={formData.basic_info[field]}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                Professional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Position
                  </label>
                  <input
                    type="text"
                    name="professional_info.position"
                    value={formData.professional_info.position}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Experience (years)
                  </label>
                  <input
                    type="number"
                    name="professional_info.experience"
                    value={formData.professional_info.experience}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Skills (comma separated)
                  </label>
                  <textarea
                    value={skillsInput}
                    onChange={handleSkillsChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="e.g. JavaScript, React, Node.js"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button and Status Messages */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>

            {/* Feedback */}
            {saveError && (
              <p className="mt-4 text-red-600 w-full text-center bg-red-100 p-3 rounded-md">
                {saveError}
              </p>
            )}
            {saveSuccess && (
              <p className="mt-4 text-green-600 w-full text-center bg-gray-100 rounded-md">
                Resume data saved successfully!
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResumeDataPopup;
