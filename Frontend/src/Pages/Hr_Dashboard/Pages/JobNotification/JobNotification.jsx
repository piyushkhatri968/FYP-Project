import React, { useState } from "react";
import { FaPlus, FaSpinner } from "react-icons/fa";
import NotificationService from "./NotificationService";
import SkillInput from "./SkillInput";
import ExperienceInput from "./ExperienceInput";
import JobTypeSelector from "./JobTypeSelector";

const JobNotification = ({ addRecentJob }) => {
  const [jobDetails, setJobDetails] = useState({
    title: "",
    department: "",
    location: "",
    description: "",
    experience: "",
    skills: [],
    jobType: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillAdd = (skill) => {
    if (!jobDetails.skills.includes(skill)) {
      setJobDetails((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
    }
  };

  const handleSkillRemove = (skill) => {
    setJobDetails((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // Placeholder for backend integration
      await NotificationService.sendNotifications(jobDetails);

      setSuccessMessage("Job posted successfully!");
      addRecentJob(jobDetails); // Update User Dashboard
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block font-medium text-gray-700">
            Job Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={jobDetails.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="department" className="block font-medium text-gray-700">
            Department
          </label>
          <input
            type="text"
            name="department"
            id="department"
            value={jobDetails.department}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="location" className="block font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={jobDetails.location}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-medium text-gray-700">
            Job Description
          </label>
          <textarea
            name="description"
            id="description"
            value={jobDetails.description}
            onChange={handleChange}
            required
            rows="5"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <ExperienceInput
          value={jobDetails.experience}
          onChange={(value) => setJobDetails((prev) => ({ ...prev, experience: value }))}
        />

        <JobTypeSelector
          value={jobDetails.jobType}
          onChange={(value) => setJobDetails((prev) => ({ ...prev, jobType: value }))}
        />

        <SkillInput
          skills={jobDetails.skills}
          onAdd={handleSkillAdd}
          onRemove={handleSkillRemove}
        />

        {successMessage && <p className="text-green-500 font-medium">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 font-medium">{errorMessage}</p>}

        <button
          type="submit"
          disabled={isSending}
          className={`w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
            isSending ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSending ? <FaSpinner className="animate-spin inline-block mr-2" /> : <FaPlus />}
          Post Job
        </button>
      </form>
    </div>
  );
};

export default JobNotification;
