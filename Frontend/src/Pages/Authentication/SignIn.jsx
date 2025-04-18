import React, { useState } from "react";
import { Alert, Spinner } from "flowbite-react";
import animateArrow from "../../assets/Icons/rigth-arrow.gif";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInSuccess,
  signInStart,
  signInFailure,
} from "../../Redux/User/UserSlice";
import SocialAuth from "../../Components/SocialAuth.jsx";
import Theme from "../../Components/Theme.jsx";
import signUpImg from "../../assets/Images/signUp.png";

const Login = () => {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const [uiError, setUiError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setUiError(null);
    if (!formData.email || !formData.password) {
      setUiError("Please fill out all fields.");
      return dispatch(signInFailure("Please fill out all fields."));
    }
    try {
      dispatch(signInStart());
      const res = await fetch(`http://localhost:8080/api/auth/signin`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setUiError(data.message);
        return dispatch(signInFailure(data.message));
      }

      if (res.ok) {
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
      {/* Them section */}
      <Theme pageName="Sign In" heroImage={signUpImg} />
      <div>
        {/* Sign Up form */}
        <div>
          <form className="p-3" onSubmit={submitHandler}>
            <div className="py-8 px-6 sm:px-12 w-full max-w-2xl mx-auto shadow-2xl rounded-3xl mt-20 mb-20 flex flex-col items-center gap-5">
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
                  "Sign In"
                )}
              </button>
              {uiError && (
                <div className="w-full">
                  <Alert color="failure">{uiError}</Alert>
                </div>
              )}
              {/* <SocialAuth /> */}
              <div className="flex items-center justify-center gap-2">
                <span className="text-gray-600 text-[17px]">
                  Don't have an Account?{" "}
                  <Link
                    to="/signup"
                    className="font-semibold hover:text-red-600 transition-all duration-500"
                  >
                    Sign Up
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

export default Login;
