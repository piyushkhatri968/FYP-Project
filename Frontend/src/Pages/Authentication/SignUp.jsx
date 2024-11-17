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
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const [uiError, setUiError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkUserType = () => {
    if (formData.userType === "select" || !formData.userType) {
      setUiError("Please select a user type.");
      return false; // Indicate invalid user type
    }
    return true; // Indicate valid user type
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setUiError(null);
    if (
      !formData.name ||
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      setUiError("Please fill out all fields.");
      return dispatch(signInFailure("Please fill out all fields."));
    }
    if (!checkUserType()) {
      return; // Stop execution if user type is invalid
    }
    try {
      dispatch(signInStart());
      const res = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.message === "Error in schemaValidation") {
          setUiError("Password must be atleast 6 characters");
          return dispatch(signInFailure(data.message));
        }
        setUiError(data.message);
        return dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        setUiError(null);
        dispatch(signInSuccess(data));
        navigate("/");
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
              <div className="flex flex-col justify-center items-start w-full gap-2 ">
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
                  onChange={handleInputChange}
                  id="username"
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
              <button
                className="bg-[#001935] text-white px-8 py-3 rounded-full font-semibold mt-5 hover:bg-red-600 transition-all duration-500"
                type="submit"
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading ...</span>
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
              {uiError && (
                <div className="w-full">
                  <Alert color="failure">{uiError}</Alert>
                </div>
              )}
              <SocialAuth />
              <div className="flex items-center justify-center gap-2">
                <span className="text-gray-600 text-[17px]">
                  Have an Account?{" "}
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
