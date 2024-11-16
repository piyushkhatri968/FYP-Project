import React, { useState } from "react";
import NotificationService from "./NotificationService";

const JobNotification = () => {
  const [jobDetails, setJobDetails] = useState({
    title: "",
    department: "",
    location: "",
    description: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // Trigger notifications to related users
      const response = await NotificationService.sendNotifications(jobDetails);

      if (response.success) {
        setSuccessMessage("Job posted and notifications sent to related users!");
      } else {
        setErrorMessage("Failed to send notifications. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Post Job and Notify Users</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
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
          <label htmlFor="department" className="block text-gray-700 font-medium mb-2">
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
          <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
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
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Job Description
          </label>
          <textarea
            name="description"
            id="description"
            value={jobDetails.description}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
            rows="5"
          />
        </div>

        {successMessage && (
          <p className="text-green-500 font-medium">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 font-medium">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={isSending}
          className={`w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
            isSending ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSending ? "Sending Notifications..." : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default JobNotification;
