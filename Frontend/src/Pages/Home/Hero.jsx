import React from "react";
import bannerImg from "../../assets/Images/Home/banner-img.png"
import { Link } from "react-router-dom";
function Hero() {
  return (
    <div className="flex items-center gap-48 justify-center h-[90vh] bg-gradient-to-r from-[#F2EDF8] to-[#FEF6F6]">
      <div className="flex flex-col gap-5">
        <p className="text-red-600 font-bold text-lg">
          Find Jobs, Employment & Career Opportunities
        </p>
        <h1 className="text-[4rem] font-extrabold w-[40vw] leading-tight">
          Get A Job That's Perfect For You
        </h1>
        <p className="text-gray-800 w-[35vw] text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="flex gap-6">
          <button className="font-semibold text-md bg-[#FD1616] text-white px-2 py-3 w-40 hover:bg-[#011935] transition-all duration-500">
            Upload your CV
          </button>
          <Link to="/contact" className="text-center font-semibold bg-white px-2 py-3 text-gray-800 w-40 hover:bg-[#FD1616] hover:text-white transition-all duration-500">
            Contact Us
          </Link>
        </div>
      </div>
      <div>
        <img
          src={bannerImg}
          alt=""
          className="w-[30vw] h-full"
          style={{
            animation: "Flikker 6s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  );
}

export default Hero;
