import React, { useState } from "react";
import { FaBullhorn, FaPlus, FaUserTie, FaCalendarAlt } from "react-icons/fa";

const EmployeeAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Welcome to Our New Marketing Manager",
      description: "We are excited to welcome Jane Doe to the team!",
      date: "2024-11-17",
    },
    {
      id: 2,
      title: "Employee Promotion",
      description: "Congratulations to John Smith on his promotion to Senior Developer.",
      date: "2024-11-15",
    },
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAnnouncement((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    if (newAnnouncement.title && newAnnouncement.description && newAnnouncement.date) {
      setAnnouncements((prev) => [
        ...prev,
        { id: prev.length + 1, ...newAnnouncement },
      ]);
      setNewAnnouncement({ title: "", description: "", date: "" });
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-gray-50 to-gray-200">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FaBullhorn className="text-blue-500" />
          Employment Announcements
        </h1>

        {/* Announcements List */}
        <section className="space-y-6 mb-8">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <FaUserTie className="text-green-500" />
                {announcement.title}
              </h2>
              <p className="text-gray-600 mt-2">{announcement.description}</p>
              <p className="text-gray-500 mt-2 flex items-center gap-2">
                <FaCalendarAlt />
                {announcement.date}
              </p>
            </div>
          ))}
        </section>

        {/* Add New Announcement */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Add New Announcement
          </h2>
          <form onSubmit={handleAddAnnouncement} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={newAnnouncement.title}
                onChange={handleChange}
                placeholder="Enter announcement title"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={newAnnouncement.description}
                onChange={handleChange}
                placeholder="Enter announcement description"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            {/* Date */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={newAnnouncement.date}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transition flex items-center justify-center gap-2"
            >
              <FaPlus />
              Add Announcement
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default EmployeeAnnouncement;
