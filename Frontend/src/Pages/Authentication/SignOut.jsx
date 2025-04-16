import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signoutsuccess } from "../../Redux/User/UserSlice";
import { Spinner } from "flowbite-react";
import { Backend_URL } from "../../config/config";
const SignOut = () => {
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    try {
      const res = await fetch(`${Backend_URL}/auth/signout`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
      } else {
        dispatch(signoutsuccess());
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {currentUser && (
        <button className="mb-2" type="submit" onClick={handleSignOut}>
          Sign Out
        </button>
      )}
    </div>
  );
};

export default SignOut;
