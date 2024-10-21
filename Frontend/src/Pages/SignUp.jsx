import React, { useState } from "react";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../Redux/User/UserSlice.js";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const [uiError, setUiError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setUiError(null);
    if (
      !formData.fullName ||
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      setUiError("Please fill out all fields.");
      return dispatch(signInFailure("Please fill out all fields."));
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
        setUiError(data.errors[0]);
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
    <div className="min-h-[85vh] sm:min-h-[78vh] mt-20">
      <div className="flex flex-col p-3 max-w-3xl mx-auto md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <div>
              <Label value="Your Name" className="h-64" />
              <TextInput
                type="text"
                placeholder="Full Name"
                id="fullName"
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label value="Your username" className="h-64" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label value="Your email" className="h-64" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label value="Your password" className="h-64 " />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading ...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/signin" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {uiError && (
            <Alert className="mt-5" color="failure">
              {uiError}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
