import React from "react";
import { FaGooglePlusG } from "react-icons/fa";


import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
const SocialAuth = () => {
  return (
    <div className="my-4">
      <p className="mb-3">Or sign up with</p>
      <div className="flex justify-center items-center gap-5">
        <FaGooglePlusG className="text-blue-600 text-[30px]" />
        <FaFacebook className="text-blue-600 text-[30px]" />
        <FaLinkedin className="text-blue-600 text-[30px]" />
      </div>
    </div>
  );
};

export default SocialAuth;
