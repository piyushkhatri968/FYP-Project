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
    name: "",
    username: "",
    email: "",
    password: "",
    userType: "select",
    position: "",
    department: "",
    companyName: "",
    companyAddress: "",
    contactNumber: "",
  });

  const { loading } = useSelector((state) => state.user);
  const [uiError, setUiError] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkUserType = () => {
    if (formData.userType === "select" || !formData.userType) {
      setUiError({ userType: "Please select a user type." });
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    setUiError({ ...uiError, [e.target.id]: "" }); // Clear field-specific errors on input
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setUiError({});

    // Basic form validation
    if (
      !formData.name ||
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      return setUiError({ general: "Please fill out all required fields." });
    }

    // Check user type
    if (!checkUserType()) return;

    // Recruiter-specific validation
    if (formData.userType === "recruiter") {
      const requiredRecruiterFields = [
        "position",
        "department",
        "companyName",
        "companyAddress",
        "contactNumber",
      ];
      const missingFields = requiredRecruiterFields.filter(
        (field) => !formData[field]
      );

      if (missingFields.length > 0) {
        const errors = {};
        missingFields.forEach((field) => {
          errors[field] = `This field is required.`;
        });
        return setUiError(errors);
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
        // Handle validation errors from backend
        if (data.errors) {
          setUiError(data.errors);
        } else {
          setUiError({ general: data.message });
        }
        return dispatch(signInFailure(data.message || "Validation failed"));
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      setUiError({ general: error.message });
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="text-center fade-in">
      <Theme pageName="Sign Up" heroImage={signUpImg} />
      <div>
        <div>
          <form className="p-3" onSubmit={submitHandler}>
            <div className="py-8 px-6 sm:px-12 w-full max-w-2xl mx-auto shadow-2xl rounded-3xl mt-20 mb-20 flex flex-col items-center gap-5">
              {/* General Error */}
              {uiError.general && (
                <Alert color="failure" className="w-full">
                  {uiError.general}
                </Alert>
              )}

              {/* Input Fields */}
              <div className="flex flex-col justify-center items-start w-full gap-2">
                <label className="font-semibold">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full rounded-full bg-[#F9F6F6] h-12 px-5"
                  id="name"
                  onChange={handleInputChange}
                />
                {uiError.name && (
                  <p className="text-red-500 text-sm">{uiError.name}</p>
                )}
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
                {uiError.username && (
                  <p className="text-red-500 text-sm">{uiError.username}</p>
                )}
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
                {uiError.email && (
                  <p className="text-red-500 text-sm">{uiError.email}</p>
                )}
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
                {uiError.password && (
                  <p className="text-red-500 text-sm">{uiError.password}</p>
                )}
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
                {uiError.userType && (
                  <p className="text-red-500 text-sm">{uiError.userType}</p>
                )}
              </div>

              {/* Recruiter-Specific Fields */}
              {formData.userType === "recruiter" && (
                <>
                  {[
                    "position",
                    "department",
                    "companyName",
                    "companyAddress",
                    "contactNumber",
                  ].map((field, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col justify-center items-start w-full gap-2"
                    >
                      <label className="font-semibold">
                        {field.replace(/([A-Z])/g, " $1")}
                      </label>
                      <input
                        type="text"
                        placeholder={field.replace(/([A-Z])/g, " $1")}
                        className="w-full rounded-full bg-[#F9F6F6] h-12 px-5"
                        id={field}
                        onChange={handleInputChange}
                      />
                      {uiError[field] && (
                        <p className="text-red-500 text-sm">{uiError[field]}</p>
                      )}
                    </div>
                  ))}
                </>
              )}

              {/* Submit Button */}
              <button
                className="bg-[#001935] text-white px-8 py-3 rounded-full font-semibold mt-5 hover:bg-red-600 transition-all duration-500"
                type="submit"
              >
                {loading ? <Spinner size="sm" /> : "Sign Up"}
              </button>

              {/* <SocialAuth /> */}
              <div className="flex items-center justify-center gap-2">
                <span className="text-gray-600 text-[17px]">
                  Already have an Account?{" "}
                  <Link
                    to="/signin"
                    className="font-semibold hover:text-red-600 transition-all duration-500"
                  >
                    Sign In
                  </Link>
                </span>
                <span>
                  <img src={animateArrow} alt="" className="w-[20px]" />
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
