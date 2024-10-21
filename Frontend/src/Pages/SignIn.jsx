import React, { useState } from "react";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInSuccess,
  signInStart,
  signInFailure,
} from "../Redux/User/UserSlice";

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
      const res = await fetch("http://localhost:8080/api/auth/signin", {
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
    <div className="min-h-[85vh] sm:min-h-[78vh] mt-20 ">
      <div className="flex flex-col p-3 max-w-3xl mx-auto md:flex-row md:items-center gap-5">
        {/* right side*/}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <div>
              <Label value="Your Email" className="h-64" />
              <TextInput
                type="email"
                placeholder="abc@company.com"
                id="email"
                onChange={handleInputChange}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label value="Your password" className="h-64 " />
              <TextInput
                type="password"
                placeholder="********"
                id="password"
                onChange={handleInputChange}
                className="mt-1"
                required
              />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading ...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to="/signup" className="text-blue-500">
              Sign Up
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

export default Login;
