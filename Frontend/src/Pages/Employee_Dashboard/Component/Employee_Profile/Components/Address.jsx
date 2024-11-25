import React from "react";

const Address = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-[#001935] font-bold text-xl md:text-2xl">Address</h1>
      <div className="flex flex-col md:flex-row mt-3 md:mt-1 md:justify-center md:items-center gap-5">
        <div className="flex flex-col gap-2 md:mt-4 w-full">
          <label>Your Country</label>
          <input
            type="text"
            placeholder="Your Country"
            className="border-gray-300 px-4 py-2.5 rounded-md md:w-78"
          />
        </div>
        <div className="flex flex-col gap-2 md:mt-4 w-full">
          <label>Your City</label>
          <input
            type="text"
            placeholder="Your City"
            className="border-gray-300 px-4 py-2.5 rounded-md md:w-78"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row mt-3 md:justify-center md:items-center gap-5">
        <div className="flex flex-col gap-2 md:mt-4 w-full">
          <label>Zip Code</label>
          <input
            type="text"
            placeholder="City Zip"
            className="border-gray-300 px-4 py-2.5 rounded-md md:w-78"
          />
        </div>
        <div className="flex flex-col gap-2 md:mt-4 w-full">
          <label>Region</label>
          <input
            type="text"
            placeholder="Your Region"
            className="border-gray-300 px-4 py-2.5 rounded-md md:w-78"
          />
        </div>
      </div>
      <div className="flex gap-3 mt-5">
        <button className="text-white bg-OrangeColor py-2 w-24 rounded-md hover:bg-BlueColor transition-all duration-500">
          Edit
        </button>
        <button className="text-white bg-OrangeColor w-24 py-2 rounded-md hover:bg-BlueColor transition-all duration-500">
          Save
        </button>
      </div>
    </div>
  );
};

export default Address;
