import React, { useEffect, useState } from "react";
import Theme from "./Theme";
import ResumeImg from "../assets/Images/Resume.jpg";
import { useSelector } from "react-redux";
import { FaFacebookF, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import axios from "axios";
import defaultImage from "../assets/Images/Avatar.png";
import { Spinner } from "flowbite-react";

const Resume = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userData, setUserData] = useState([]);
  const [loading, setloading] = useState(false);

  const getUserData = async () => {
    try {
      setloading(true);
      const response = await axios.get(
        `http://localhost:8080/api/user/getUserInfo/${currentUser._id}`
      );
      setUserData(response.data.data);
      console.log(response.data.data.candidateDetails);
      setloading(false);
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, [currentUser]);

  return (
    <div>
      {loading ? (
        <div>
          <Spinner size="sm" />
        </div>
      ) : (
        <>
          {/* <Theme pageName="Resume" heroImage={ResumeImg} /> */}
          <div className="w-full h-screen">
            <div className="">
              {/* PROFILE SECTION */}
              <div className="text-center">
                <img
                  src={
                    userData.profilePicture ||
                    defaultImage ||
                    currentUser.profilePicture
                  }
                  alt=""
                  className="w-40 h-40 mx-auto rounded-full object-cover"
                />
                <h1 className="text-3xl font-bold text-gray-800 mt-4">
                  {userData.name}
                </h1>
                <p className="text-gray-500 text-lg mt-1 mb-3">
                  {userData?.candidateDetails?.position}
                </p>
                <a
                  href={userData?.candidateDetails?.resume}
                  target="_blank"
                  className="px-4 py-2 bg-BlueColor text-white rounded-md cursor-pointer" 
                >
                  Resume
                </a>
                <div className="flex justify-center items-center gap-4 mt-3">
                  <FaFacebookF className="text-BlueColor hover:text-OrangeColor transition-all duration-300 text-3xl" />
                  <FaTwitter className="text-BlueColor hover:text-OrangeColor transition-all duration-300 text-3xl" />
                  <FaLinkedin className="text-BlueColor hover:text-OrangeColor transition-all duration-300 text-3xl" />
                  <FaGithub className="text-BlueColor hover:text-OrangeColor transition-all duration-300 text-3xl" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Resume;
