import React, { useState } from "react";
import signUpImg from "../../assets/Images/signUp.png";
import animateArrow from "../../assets/Icons/rigth-arrow.gif";
import { Alert, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../Redux/User/UserSlice.js";
import SocialAuth from "../../Components/SocialAuth.jsx";
import Theme from "../../Components/Theme.jsx";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    userType: 'select',
    position: '',
    department: '',
    companyName: '',
    companyAddress: '',
    contactNumber: ''
  });
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const [uiError, setUiError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkUserType = () => {
    if (formData.userType === "select" || !formData.userType) {
      setUiError("Please select a user type.");
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setUiError(null);
  
    // Basic form validation
    if (!formData.name || !formData.username || !formData.email || !formData.password) {
      setUiError("Please fill out all fields.");
      return dispatch(signInFailure("Please fill out all fields."));
    }
  
    // Check user type
    if (!checkUserType()) return;
  
    // Recruiter-specific validation
    if (formData.userType === "recruiter") {
      const requiredRecruiterFields = [
        "position", "department", "companyName", "companyAddress", "contactNumber"
      ];
      const missingFields = requiredRecruiterFields.filter(field => !formData[field]);
  
      if (missingFields.length > 0) {
        setUiError(`Please fill out all recruiter-specific fields: ${missingFields.join(', ')}`);
        return dispatch(signInFailure("Please fill out all recruiter-specific fields."));
      }
    }
  
    // Exclude recruiter fields if userType is 'employee'
    let finalFormData = { ...formData };
    if (formData.userType === "employee") {
      finalFormData = {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        userType: formData.userType,
      };
    }
  
    try {
      dispatch(signInStart());
      const res = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalFormData),
      });
  
      const data = await res.json();
      if (!res.ok) {
        setUiError(data.message);
        return dispatch(signInFailure(data.message));
      }
  
      if (res.ok) {
        setUiError(null);
        dispatch(signInSuccess(data));
        navigate("/"); // Redirect to home page
      }
    } catch (error) {
      setUiError(error.message);
      return dispatch(signInFailure(error.message));
    }
  };
  

  return (
    <div className="text-center fade-in">
      <Theme pageName="Sign Up" heroImage={signUpImg} />
      <div>
        {/* Sign Up form */}
        <div>
          <form className="p-3" onSubmit={submitHandler}>
            <div className="py-8 px-6 sm:px-12 w-full max-w-2xl mx-auto shadow-2xl rounded-3xl mt-20 mb-20 flex flex-col items-center gap-5">
              {/* Basic Fields */}
              <div className="flex flex-col justify-center items-start w-full gap-2">
                <label className="font-semibold">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full rounded-full bg-[#F9F6F6] h-12 px-5"
                  id="name"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col justify-center items-start w-full gap-2">
                <label className="font-semibold">Username</label>
                <input
                  type="text"
                  placeholder="Your Username"
                  className="w-full rounded-full bg-[#F9F6F6] h-12 px-5"
                  id="username"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col justify-center items-start w-full gap-2">
                <label className="font-semibold">Email</label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full rounded-full bg-[#F9F6F6] h-12 px-5"
                  id="email"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col justify-center items-start w-full gap-2">
                <label className="font-semibold">Password</label>
                <input
                  type="password"
                  placeholder="Your Password"
                  className="w-full rounded-full bg-[#F9F6F6] h-12 px-5"
                  id="password"
                  onChange={handleInputChange}
                />
              </div>

              {/* User Type Selector */}
              <div className="flex flex-col justify-center items-start w-full gap-2">
                <label className="font-semibold">User Type</label>
                <select
                  id="userType"
                  className="w-full rounded-full bg-[#F9F6F6] h-12 px-5"
                  onChange={handleInputChange}
                >
                  <option value="select">Select</option>
                  <option value="employee">Job Seeker</option>
                  <option value="recruiter">Recruiter</option>
                </select>
              </div>

              {/* Recruiter-Specific Fields */}
              {formData.userType === "recruiter" && (
                <>
                  <div className="flex flex-col justify-center items-start w-full gap-2">
                    <label className="font-semibold">Position</label>
                    <input
                      type="text"
                      placeholder="Position"
                      className="w-full rounded-full bg-[#F9F6F6] h-12 px-5"
                      id="position"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col justify-center items-start w-full gap-2">
                    <label className="font-semibold">Department</label>
                    <input
                      type="text"
                      placeholder="Department"
                      className="w-full rounded-full bg-[#F9F6F6] h-12 px-5"
                      id="department"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col justify-center items-start w-full gap-2">
                    <label className="font-semibold">Company Name</label>
                    <input
                      type="text"
                      placeholder="Company Name"
                      className="w-full rounded-full bg-[#F9F6F6] h-12 px-5"
                      id="companyName"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col justify-center items-start w-full gap-2">
                    <label className="font-semibold">Company Address</label>
                    <input
                      type="text"
                      placeholder="Company Address"
                      className="w-full rounded-full bg-[#F9F6F6] h-12 px-5"
                      id="companyAddress"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col justify-center items-start w-full gap-2">
                    <label className="font-semibold">Contact Number</label>
                    <input
                      type="text"
                      placeholder="Contact Number"
                      className="w-full rounded-full bg-[#F9F6F6] h-12 px-5"
                      id="contactNumber"
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              )}

              {/* Submit Button */}
              <button
                className="bg-[#001935] text-white px-8 py-3 rounded-full font-semibold mt-5 hover:bg-red-600 transition-all duration-500"
                type="submit"
              >
                {loading ? <Spinner size="sm" /> : "Sign Up"}
              </button>

              {/* Error Alert */}
              {uiError && (
                <div className="w-full">
                  <Alert color="failure">{uiError}</Alert>
                </div>
              )}




            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
