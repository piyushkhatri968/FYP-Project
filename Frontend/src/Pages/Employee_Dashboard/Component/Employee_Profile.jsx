import React from "react";

const Employee_Profile = () => {
  return (
    <div className="mx-auto p-3 w-full text-gray-500 px-12 shadow-lg rounded-xl">
      {/* BASIC INFORMATION */}

      <div className="flex flex-col mt-3">
        <h1 className="text-[#001935] font-bold text-xl md:text-2xl">
          Basic Information
        </h1>
        <div className="flex flex-col md:flex-row mt-3 md:mt-1 md:justify-center md:items-center gap-5">
          <div className="flex flex-col gap-2 md:mt-4 w-full">
            <label>Your Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="border-gray-300 px-4 py-2.5 rounded-md md:w-78"
            />
          </div>
          <div className="flex flex-col gap-2 md:mt-4 w-full">
            <label>Your Email</label>
            <input
              type="email"
              placeholder="Your Email"
              className="border-gray-300 px-4 py-2.5 rounded-md md:w-78"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row mt-3 md:justify-center md:items-center gap-5">
          <div className="flex flex-col gap-2 md:mt-4 w-full">
            <label>Your Phone</label>
            <input
              type="text"
              placeholder="Your Phone"
              className="border-gray-300 px-4 py-2.5 rounded-md md:w-78"
            />
          </div>
          <div className="flex flex-col gap-2 md:mt-4 w-full">
            <label>Job Title</label>
            <input
              type="text"
              placeholder="Job Title"
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

      <hr className="my-8" />

      {/* ADDRESS */}

      <div className="flex flex-col">
        <h1 className="text-[#001935] font-bold text-xl md:text-2xl">
          Address
        </h1>
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

      <hr className="my-8" />

      {/* OTHER INFORMATION */}

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

      <hr className="my-8" />

      {/* SOCIAL LINKS */}

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
              className="border-gray-300 px-4 py-2.5 rounded-md md:w-78"
            />
          </div>
          <div className="flex flex-col gap-2 md:mt-4 w-full">
            <label>Twitter</label>
            <input
              type="number"
              placeholder="https://twitter.com/"
              className="border-gray-300 px-4 py-2.5 rounded-md md:w-78"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row mt-3 md:justify-center md:items-center gap-5">
          <div className="flex flex-col gap-2 md:mt-4 w-full">
            <label>Linkedin</label>
            <input
              type="text"
              placeholder="https://www.linkedin.com/"
              className="border-gray-300 px-4 py-2.5 rounded-md md:w-78"
            />
          </div>
          <div className="flex flex-col gap-2 md:mt-4 w-full">
            <label>Github</label>
            <input
              type="text"
              placeholder="https://github.com/"
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
    </div>
  );
};

export default Employee_Profile;
