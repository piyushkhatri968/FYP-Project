import React from "react";
import Theme from "./Theme";
import ResumeImg from "../assets/Images/Resume.jpg";
import { useSelector } from "react-redux";
import { FaFacebookF, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Resume = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      {/* <Theme pageName="Resume" heroImage={ResumeImg} /> */}
      <div>
        <div className="rounded-lg shadow-xl mt-32">
          {/* PROFILE SECTION */}
          <div className="text-center">
            <img
              src={currentUser.profilePicture}
              alt=""
              className="w-40 h-40 mx-auto rounded-full object-cover"
            />
            <h1 className="text-3xl font-bold text-gray-800 mt-4">
              {currentUser.name}
            </h1>
            <p className="text-gray-500 text-lg mt-1">Web Developer</p>
            <div className="flex justify-center items-center gap-4 mt-3">
              <FaFacebookF className="text-BlueColor hover:text-OrangeColor transition-all duration-300 text-3xl"/>
              <FaTwitter className="text-BlueColor hover:text-OrangeColor transition-all duration-300 text-3xl" />
              <FaLinkedin className="text-BlueColor hover:text-OrangeColor transition-all duration-300 text-3xl" />
              <FaGithub className="text-BlueColor hover:text-OrangeColor transition-all duration-300 text-3xl" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resume;
