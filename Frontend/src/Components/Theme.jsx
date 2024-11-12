import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Theme = (props) => {
  return (
    //? For Main name pass the prop as 'pageName' and for the image "heroImage"

    <div className="h-[40vh] sm:h-[50vh] bg-[#070e1f] bg-opacity-80 relative flex justify-center items-center text-white">
      <img
        src={props.heroImage}
        alt=""
        className="absolute top-0 -z-10 w-[100%] h-[40vh] sm:h-[50vh] object-cover mx-auto"
      />
      {/* Top Design */}
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl md:text-5xl font-bold">{props.pageName}</h1>
        <div className="flex justify-center items-center gap-6 border border-gray-500 max-w-60 py-3 px-4 rounded-full mx-auto">
          <Link
            to={"/"}
            className="hover:text-red-600 transition-all duration-500 font-bold"
          >
            Home
          </Link>
          <FaArrowRight />
          <span>{props.pageName}</span>
        </div>
      </div>
    </div>
  );
};

export default Theme;
