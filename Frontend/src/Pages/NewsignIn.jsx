import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import signUpImg from "../assets/Images/signUp.png";
const NewsignIn = () => {
  return (
    <div className="text-center ">
      <div className="h-[50vh] sm:h-[60vh] bg-[#070e1f] bg-opacity-80 relative flex justify-center items-center text-white">
        <img
          src={signUpImg}
          alt=""
          className="absolute top-0 -z-10 w-[100%] h-[50vh] sm:h-[60vh] object-cover mx-auto"
        />
        {/* Top Design */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-bold">Sign Up</h1>
          <div className="flex justify-center items-center gap-6 border border-gray-500 max-w-60 py-3 px-4 rounded-full mx-auto">
            <Link
              to={"/home"}
              className="hover:text-red-600 transition-all duration-500 font-bold"
            >
              Home
            </Link>
            <FaArrowRight />
            <span>Sign Up</span>
          </div>
        </div>
      </div>
      <div>
        {/* Sign Up form */}
        <div>
          <form>
            <div>
              <label htmlFor="">Enter FullName</label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsignIn;
