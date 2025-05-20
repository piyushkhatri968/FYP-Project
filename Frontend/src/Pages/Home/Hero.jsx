import React from "react";
import bannerImg from "../../assets/Images/Home/banner-img.png";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 justify-center h-[90vh] bg-gradient-to-r from-[#F2EDF8] to-[#FEF6F6] px-4 lg:px-16 py-8">
      <div className="flex flex-col gap-5 text-center lg:text-left">
        <p className="text-red-600 font-bold text-base lg:text-lg mt-16 md:mt-8">
          Find Jobs, Employment & Career Opportunities
        </p>
        <h1 className="text-3xl lg:text-[4rem] lg:w-[40rem] text-[#001935] font-extrabold leading-snug lg:leading-tight">
          Get A Job That's Perfect For You
        </h1>
        <p className="text-gray-800 text-sm lg:text-base max-w-lg mx-auto lg:mx-0">
          Discover a platform designed to connect talented individuals with
          exceptional opportunities. Whether you're looking to kickstart your
          career or take the next big step, we make it easy to find jobs that
          match your skills and aspirations.
        </p>
        <div className="flex gap-4 justify-center lg:justify-start">
          <Link
            to="/resume-analyzer"
            className="font-semibold text-sm lg:text-md bg-[#FD1616] text-white px-4 py-3 w-full sm:w-auto hover:bg-[#011935] transition-all duration-500"
          >
            Upload your CV
          </Link>
          <Link
            to="/contact"
            className="text-center font-semibold bg-white px-4 py-3 text-gray-800 w-full sm:w-auto hover:bg-[#FD1616] hover:text-white transition-all duration-500"
          >
            Contact Us
          </Link>
        </div>
      </div>
      <div className="w-[20rem] md:w-[25rem] lg:w-[30rem]">
        <img
          src={bannerImg}
          alt="Hero Banner"
          className=""
          style={{
            animation: "Flikker 6s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  );
}

export default Hero;
