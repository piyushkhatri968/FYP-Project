import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ProfileCompletionPopup = () => {
  const [openModal, setOpenModal] = useState(true);

  return (
    openModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg relative">
          <div
            className="absolute -top-4 -right-4 cursor-pointer"
            onClick={() => setOpenModal(false)}
          >
            <IoCloseSharp className="text-4xl p-1 bg-black rounded-full text-white" />
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12">
            <div className="flex justify-center">
              <DotLottieReact
                src="https://lottie.host/859de488-fe1f-4447-96fc-f587b3f0ffe5/54LXII68hX.lottie"
                loop
                autoplay
                className="w-56 h-56 md:w-96 md:h-96"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-center mb-4">
                Complete Your Profile!
              </h2>
              <p className="text-gray-600 text-center mb-6 max-w-72 md:max-w-96">
                Fill out the necessary information to get the best job
                suggestions tailored just for you! Take the next step in your
                job-seeking journey.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="bg-[#FD1616] text-white px-4 py-2 rounded-lg shadow hover:bg-blue-900 transition duration-200">
              <a href="/dashboard/employee?tab=profile">Complete My Profile</a>
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ProfileCompletionPopup;
