import React, { useState } from "react";

const Basic_Info = ({ userData }) => {
  const [formData, setFormData] = useState({});

  const handleChangeFormInputs = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="flex flex-col mt-3">
      <h1 className="text-[#001935] font-bold text-xl md:text-2xl">
        Basic Information
      </h1>
      <form>
        <div className="flex flex-col md:flex-row mt-3 md:mt-1 md:justify-center md:items-center gap-5">
          <div className="flex flex-col gap-2 md:mt-4 w-full">
            <label>Your Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="border-gray-300 px-4 py-2.5 rounded-md md:w-78 placeholder:text-gray-500 placeholder:font-normal text-black font-semibold"
              id="name"
              value={userData.name}
            />
          </div>
          <div className="flex flex-col gap-2 md:mt-4 w-full">
            <label>Your Email</label>
            <input
              type="email"
              placeholder="Your Email"
              className="border-gray-300 px-4 py-2.5 rounded-md md:w-78 placeholder:text-gray-500 placeholder:font-normal text-black font-semibold"
              id="name"
              value={userData.email}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row mt-3 md:justify-center md:items-center gap-5">
          <div className="flex flex-col gap-2 md:mt-4 w-full">
            <label>Your Phone</label>
            <input
              type="text"
              placeholder="Your Phone"
              className="border-gray-300 px-4 py-2.5 rounded-md md:w-78 placeholder:text-gray-500 placeholder:font-normal text-black font-semibold "
              id="phone"
              value={userData.phone}
              onChange={handleChangeFormInputs}
            />
          </div>
          <div className="flex flex-col gap-2 md:mt-4 w-full">
            <label>Job Title</label>
            <input
              type="text"
              placeholder="Job Title"
              className="border-gray-300 px-4 py-2.5 rounded-md md:w-78 placeholder:text-gray-500 placeholder:font-normal text-black font-semibold"
              id="jobTitle"
              onChange={handleChangeFormInputs}
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
      </form>
    </div>
  );
};

export default Basic_Info;
