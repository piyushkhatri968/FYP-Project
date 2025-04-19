import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddNewAdmin = ({ getTotalUsers }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:8080/api/admin/register`,
        formData,
        { withCredentials: true }
      );
      if (response.status === 200) {
        // toast.success(response.data.message);
        getTotalUsers();
        navigate("/dashboard/admin?tab=allAdmins");
        setLoading(false);
      }
    } catch (error) {
      //   toast.error(error.response?.data?.message || "Server Error.");
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full mt-6 flex flex-col items-center rounded-md overflow-hidden bg-[#0D1B2A] p-4"
      style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)" }}
    >
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-6 items-center justify-center w-full max-w-xl"
      >
        <h1 className="font-bold text-2xl mt-4 mb-8">Add New Admin</h1>
        <div className="group border-b bg-BlueColor hover:bg-BlueColor w-full h-15 rounded-t-sm py-2 px-3 flex flex-col justify-center focus-within:border-[#00b79e] transition-all duration-200">
          <label
            htmlFor="name"
            className="text-[12px] text-[#C7C7C7] group-focus-within:text-[#00b79e] w-full"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            className="outline-none bg-transparent border-none focus:outline-none"
            value={formData.name || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="group border-b bg-BlueColor hover:bg-BlueColor w-full h-15 rounded-t-sm py-2 px-3 flex flex-col justify-center focus-within:border-[#00b79e] transition-all duration-200">
          <label
            htmlFor="username"
            className="text-[12px] text-[#C7C7C7] group-focus-within:text-[#00b79e] w-full"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            className="outline-none bg-transparent border-none"
            value={formData.username || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="group border-b bg-BlueColor hover:bg-BlueColor w-full h-15 rounded-t-sm py-2 px-3 flex flex-col justify-center focus-within:border-[#00b79e] transition-all duration-200">
          <label
            htmlFor="email"
            className="text-[12px] text-[#C7C7C7] group-focus-within:text-[#00b79e] w-full"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            className="outline-none bg-transparent border-none"
            value={formData.email || ""}
            onChange={handleChange}
            required
          />
        </div>
        {/* Password Field */}
        <div className="group border-b bg-BlueColor hover:bg-BlueColor w-full h-15 rounded-t-sm py-2 px-3 flex flex-col justify-center focus-within:border-[#00b79e] transition-all duration-200">
          <label
            htmlFor="password"
            className="text-[12px] text-[#C7C7C7] group-focus-within:text-[#00b79e] w-full"
          >
            Password
          </label>
          <div className="w-full flex">
            <input
              type={passwordShow ? "text" : "password"}
              name="password"
              className="outline-none bg-transparent w-full  border-none"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {passwordShow ? (
              <IoEyeOff
                size={26}
                className="cursor-pointer hover:bg-[#424242] rounded-full p-1 transition-all duration-200"
                onClick={() => setPasswordShow(!passwordShow)}
              />
            ) : (
              <IoEye
                size={26}
                className="cursor-pointer hover:bg-[#424242] rounded-full p-1 transition-all duration-200"
                onClick={() => setPasswordShow(!passwordShow)}
              />
            )}
          </div>
        </div>

        {/* Add button */}
        <button
          type="submit"
          className={`text py-3 rounded-sm  transition-all duration-200 w-full mt-4 text-center font-bold ${
            loading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#010c29e1] hover:bg-[#010C29]  cursor-pointer"
          }`}
        >
          {loading ? "..." : "ADD"}
        </button>
      </form>
    </div>
  );
};

export default AddNewAdmin;
