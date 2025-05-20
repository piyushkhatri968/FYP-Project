import React from "react";

const Social_Links = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-[#001935] font-bold text-xl md:text-2xl">
        Social links
      </h1>
      <div className="flex flex-col md:flex-row mt-3 md:mt-1 md:justify-center md:items-center gap-5">
        <div className="flex flex-col gap-2 md:mt-4 w-full">
          <label>Facebook</label>
          <input
            type="text"
            placeholder="https://www.facebook.com/"
            className="border-gray-300 px-4 py-2.5 rounded-md md:w-78 placeholder:text-gray-500 placeholder:font-normal text-black font-semibold"
          />
        </div>
        <div className="flex flex-col gap-2 md:mt-4 w-full">
          <label>Twitter</label>
          <input
            type="number"
            placeholder="https://twitter.com/"
            className="border-gray-300 px-4 py-2.5 rounded-md md:w-78 placeholder:text-gray-500 placeholder:font-normal text-black font-semibold"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row mt-3 md:justify-center md:items-center gap-5">
        <div className="flex flex-col gap-2 md:mt-4 w-full">
          <label>Linkedin</label>
          <input
            type="text"
            placeholder="https://www.linkedin.com/"
            className="border-gray-300 px-4 py-2.5 rounded-md md:w-78 placeholder:text-gray-500 placeholder:font-normal text-black font-semibold"
          />
        </div>
        <div className="flex flex-col gap-2 md:mt-4 w-full">
          <label>Github</label>
          <input
            type="text"
            placeholder="https://github.com/"
            className="border-gray-300 px-4 py-2.5 rounded-md md:w-78 placeholder:text-gray-500 placeholder:font-normal text-black font-semibold"
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

export default Social_Links;
