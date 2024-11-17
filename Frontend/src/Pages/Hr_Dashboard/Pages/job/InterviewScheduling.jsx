import React, { useState } from "react";
import { FaUser, FaCalendarAlt, FaClock, FaStickyNote } from "react-icons/fa";

const InterviewScheduling = () => {
  const [formData, setFormData] = useState({
    candidateName: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Interview scheduled for ${formData.candidateName}!`);
    // Clear form data after submission
    setFormData({ candidateName: "", date: "", time: "", notes: "" });
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-gray-50 to-gray-200">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Schedule an Interview
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Candidate Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              <FaUser className="inline-block mr-2 text-gray-600" />
              Candidate Name
            </label>
            <input
              type="text"
              name="candidateName"
              value={formData.candidateName}
              onChange={handleChange}
              placeholder="Enter candidate name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Interview Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              <FaCalendarAlt className="inline-block mr-2 text-gray-600" />
              Interview Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Interview Time */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              <FaClock className="inline-block mr-2 text-gray-600" />
              Interview Time
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              <FaStickyNote className="inline-block mr-2 text-gray-600" />
              Notes (Optional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add any additional notes"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transition"
          >
            Schedule Interview
          </button>
        </form>
      </div>
    </div>
  );
};

export default InterviewScheduling;
