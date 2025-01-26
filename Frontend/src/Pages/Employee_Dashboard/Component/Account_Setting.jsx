import React from "react";
import { useSelector } from "react-redux";
const Account_Setting = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-6 min-h-screen shadow-2xl rounded-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Account Settings</h1>
      <div>
        <form>
          <div className="w-full flex justify-center items-center flex-col">
            <img
              src={currentUser.profilePicture}
              className="w-32 h-32 rounded-full mb4"
              alt=""
            />
            <div className="flex flex-col gap-2 md:mt-4 w-full max-w-lg">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder={currentUser.name}
                className="border-gray-300 px-4 py-2.5 rounded-md md:w-78  text-black font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2 md:mt-4 w-full max-w-lg">
              <label htmlFor="name">Email</label>
              <input
                type="text"
                id="email"
                placeholder={currentUser.email}
                className="border-gray-300 px-4 py-2.5 rounded-md md:w-78  text-black font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2 md:mt-4 w-full max-w-lg">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="******"
                className="border-gray-300 px-4 py-2.5 rounded-md md:w-78  text-black font-semibold"
              />
            </div>
            <button className="w-full max-w-lg bg-[#010c29eb] text-center text-white font-semibold p-2 mt-4 rounded-md hover:bg-[#010C29] transition-all duration-300">
              Update
            </button>
            <div className="flex justify-between items-center w-full max-w-lg mt-2">
              <button className="text-red-600 font-semibold">
                Delete Account
              </button>
              <button className="text-red-600 font-semibold">Sign Out</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Account_Setting;
