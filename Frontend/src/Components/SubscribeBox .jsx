import React from "react";

const SubscribeBox = () => {
  return (
    <div className="bg-red-600 text-white py-10 px-6 md:px-12 lg:px-28 flex flex-col md:flex-row items-center justify-between h-48">
      {/* Text Section */}
      <div className="text-center md:text-left mb-4 md:mb-0">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Get New Job Notifications
        </h2>
        <p className="text-sm md:text-base lg:text-md mt-2">
          Subscribe & get all related job notifications
        </p>
      </div>

      {/* Input Section */}
      <div className="flex items-center">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-[12rem] md:w-[20rem] lg:w-[30rem]  h-12 md:h-16 px-4 py-2 text-gray-700 rounded-l-lg focus:outline-none"
        />
        <button className="bg-blue-900 text-white px-4 py-2 rounded-r-lg font-semibold w-28 md:32 lg:w-36 h-12 md:h-16">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default SubscribeBox;
