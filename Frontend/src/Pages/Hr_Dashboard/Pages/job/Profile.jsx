import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function Profile() {
  const { currentUser } = useSelector((state) => state.user); // Get current user from Redux
  const [formData, setFormData] = useState({
    contactNumber: "",
    companyName: "",
    companyAddress: "",
    department: "",
    position: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  // Fetch existing user data when the component loads
  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:8080/api/recruiter/profile/${currentUser._id}`);

        // If the profile is not empty, mark it as complete
        if (data.contactNumber || data.companyName || data.companyAddress || data.department || data.position) {
          setFormData({
            contactNumber: data.contactNumber || "",
            companyName: data.companyName || "",
            companyAddress: data.companyAddress || "",
            department: data.department || "",
            position: data.position || "",
          });
          setIsProfileComplete(true); // Profile exists, show "edit" button
        }

        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError("Failed to load profile data.");
      }
    };
    fetchUserData();
  }, [currentUser]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      setError("No user is logged in.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccessMessage("");

      const userType = currentUser.userType;
      const requiredFields = userType === "recruiter" ? [
        "contactNumber", 
        "companyName", 
        "companyAddress", 
        "department", 
        "position"
      ] : [];

      // Check if all required fields are filled for recruiters
      for (const field of requiredFields) {
        if (!formData[field]) {
          setError(`${field} is required.`);
          setLoading(false);
          return;
        }
      }

      const response = await axios.post("http://localhost:8080/api/recruiter/completeProfile", {
        userId: currentUser._id,
        ...formData,
      });

      setLoading(false);
      setSuccessMessage(response.data.message || "Profile saved successfully!");
      setIsProfileComplete(true); // Mark profile as saved
      setIsEditing(false); // Exit editing mode
    } catch (error) {
      setLoading(false);
      setError("An error occurred while saving data. Please try again.");
      console.error("Error saving recruiter data:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Profile</h2>
      {loading && <p className="text-blue-600 mb-4">Loading...</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}

      {!isProfileComplete ? (
        // New user form - Show form fields to fill out
        <form onSubmit={handleSubmit} className="space-y-4">
          {currentUser?.userType === "recruiter" ? (
            <>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Contact Number</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Company Address</label>
                <input
                  type="text"
                  name="companyAddress"
                  value={formData.companyAddress}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Position</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </>
          ) : (
            <p className="text-gray-600">Employee Profile. Additional fields will be available soon.</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md shadow-sm 
            hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      ) : (
        // Existing user - Show profile with an "Edit" button
        <div>
          <div className="space-y-4">
            {currentUser?.userType === "recruiter" ? (
              <>
                <p><strong>Contact Number:</strong> {formData.contactNumber || "Not provided"}</p>
                <p><strong>Company Name:</strong> {formData.companyName || "Not provided"}</p>
                <p><strong>Company Address:</strong> {formData.companyAddress || "Not provided"}</p>
                <p><strong>Department:</strong> {formData.department || "Not provided"}</p>
                <p><strong>Position:</strong> {formData.position || "Not provided"}</p>
              </>
            ) : (
              <p className="text-gray-600">Employee profile data will be displayed here soon.</p>
            )}
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-6 py-2 px-4 bg-blue-600 text-white font-medium rounded-md shadow-sm 
            hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Edit Profile
          </button>
        </div>
      )}

      {/* Edit Mode */}
      {isEditing && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {currentUser?.userType === "recruiter" ? (
            <>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Contact Number</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Company Address</label>
                <input
                  type="text"
                  name="companyAddress"
                  value={formData.companyAddress}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Position</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </>
          ) : (
            <p className="text-gray-600">Employee profile editing coming soon.</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md shadow-sm 
            hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      )}
    </div>
  );
}

export default Profile;
