import React from "react";

const Other_Info = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-[#001935] font-bold text-xl md:text-2xl">
        Other Information
      </h1>
      <div className="flex flex-col md:flex-row mt-3 md:mt-1 md:justify-center md:items-center gap-5">
        <div className="flex flex-col gap-2 md:mt-4 w-full">
          <label>Age</label>
          <input
            type="text"
            placeholder="Your Age"
            className="border-gray-300 px-4 py-2.5 rounded-md md:w-78"
          />
        </div>
        <div className="flex flex-col gap-2 md:mt-4 w-full">
          <label>Work Experience</label>
          <input
            type="number"
            placeholder="Work Experience"
            className="border-gray-300 px-4 py-2.5 rounded-md md:w-78"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row mt-3 md:justify-center md:items-center gap-5">
        <div className="flex flex-col gap-2 md:mt-4 w-full">
          <label>Language</label>
          <input
            type="text"
            placeholder="Language"
            className="border-gray-300 px-4 py-2.5 rounded-md md:w-78"
          />
        </div>
        <div className="flex flex-col gap-2 md:mt-4 w-full">
          <label>Skill</label>
          <input
            type="text"
            placeholder="Skill"
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

export default Other_Info;
