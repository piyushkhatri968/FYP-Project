import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../../Components/Loader";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    contactNumber: "",
    companyName: "",
    companyAddress: "",
    department: "",
    position: "",
  });
  const [userInfo, setUserInfo] = useState({
    name: "",
    username: "",
    email: "",
    profilePicture: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);

  const fetchUserData = async () => {
    if (!currentUser) return;
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8080/api/recruiter/profile/${currentUser._id}`);
      if (data.contactNumber || data.companyName || data.companyAddress || data.department || data.position) {
        setFormData({
          contactNumber: data.contactNumber || "",
          companyName: data.companyName || "",
          companyAddress: data.companyAddress || "",
          department: data.department || "",
          position: data.position || "",
        });
        setIsProfileComplete(true);
      }
      setUserInfo({
        name: data.userId?.name || "",
        username: data.userId?.username || "",
        email: data.userId?.email || "",
        profilePicture: data.userId?.profilePicture || "",
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Failed to load profile data.");
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserInfoChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setImageFile(files[0]);
    } else {
      setUserInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return;
    setImageUploading(true);
    const imageData = new FormData();
    imageData.append("file", imageFile);
    imageData.append("upload_preset", "for_fyp_project");
    imageData.append("cloud_name", "dtfvymy9c");
    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/dtfvymy9c/image/upload", imageData);
      const imageUrl = res.data.secure_url;
      setUserInfo((prev) => ({ ...prev, profilePicture: imageUrl }));
      setImageUploading(false);
    } catch (err) {
      setError("Failed to upload image. Please try again.");
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return setError("No user logged in.");

    try {
      setLoading(true);
      setError("");
      setSuccessMessage("");

      const requiredFields = currentUser.userType === "recruiter"
        ? ["contactNumber", "companyName", "companyAddress", "department", "position"]
        : [];

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
        ...userInfo,
      });

      await fetchUserData();
      setLoading(false);
      setSuccessMessage(response.data.message || "Profile updated successfully!");
      setIsProfileComplete(true);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError("Failed to save profile.");
    }
  };

  const handleDeleteAccount = async () => {
    if (!currentUser) return;
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone!");

    if (confirmDelete) {
      try {
        setLoading(true);
        await axios.delete(`http://localhost:8080/api/user/delete/${currentUser._id}`);
        setLoading(false);
        alert("Account deleted successfully. Redirecting...");
        window.location.href = "/"; // redirect to homepage or login
      } catch (err) {
        setLoading(false);
        setError("Failed to delete account.");
      }
    }
  };

  if(loading){
    return <Loader />;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-white via-gray-100 to-white shadow-xl rounded-3xl mt-12">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Profile</h2>

      {loading && <p className="text-blue-600 mb-4 text-center animate-pulse">Loading...</p>}
      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
      {successMessage && <p className="text-green-600 mb-4 text-center">{successMessage}</p>}

      <div className="flex flex-col items-center space-y-4 mb-8">
        {userInfo.profilePicture ? (
          <img
            src={userInfo.profilePicture}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover shadow-md hover:scale-105 transition-transform"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-white text-xl">
            N/A
          </div>
        )}
        <div className="text-center">
          <h3 className="text-2xl font-semibold">{userInfo.name || "Name not available"}</h3>
          <p className="text-gray-600">@{userInfo.username || "username"}</p>
          <p className="text-gray-500">{userInfo.email || "email not available"}</p>
        </div>
      </div>

      {!isEditing ? (
        <div className="space-y-6">
          {/* Viewing fields */}
          {Object.entries({
            Name: userInfo.name,
            Username: userInfo.username,
            Email: userInfo.email,
            ...(currentUser?.userType === "recruiter" && {
              "Contact Number": formData.contactNumber,
              "Company Name": formData.companyName,
              "Company Address": formData.companyAddress,
              Department: formData.department,
              Position: formData.position,
            }),
          }).map(([label, value]) => (
            <div key={label}>
              <h4 className="text-lg font-medium text-gray-700">{label}</h4>
              <p className="text-gray-600">{value || "Not provided"}</p>
            </div>
          ))}

          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 mt-8">
            <button
              onClick={() => setIsEditing(true)}
              className="py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition"
            >
              Edit Profile
            </button>
            <button
              onClick={handleDeleteAccount}
              className="py-2 px-6 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold transition"
            >
              Delete Account
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Editing fields */}
          {["name", "username", "email"].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 mb-2 font-semibold capitalize">{field}</label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={userInfo[field]}
                onChange={handleUserInfoChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          <div>
            <label className="block text-gray-700 mb-2 font-semibold">Profile Picture</label>
            <input type="file" name="profilePicture" onChange={handleUserInfoChange} className="w-full" />
            <button
              type="button"
              onClick={uploadImage}
              disabled={imageUploading}
              className="mt-2 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md"
            >
              {imageUploading ? "Uploading..." : "Upload Image"}
            </button>
          </div>

          {currentUser?.userType === "recruiter" && (
            <>
              {["contactNumber", "companyName", "companyAddress", "department", "position"].map((field) => (
                <div key={field}>
                  <label className="block text-gray-700 mb-2 font-semibold capitalize">{field.replace(/([A-Z])/g, " $1")}</label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              ))}
            </>
          )}

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="py-2 px-4 bg-gray-400 hover:bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Profile;
