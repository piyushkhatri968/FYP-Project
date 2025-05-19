import React from "react";
import bannerImg3 from "../../assets/Images/Home/banner-img-3.png";
import { BiDoorOpen } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";

const HowWebWorks = () => {
  return (
    <div className="flex justify-center items-center flex-wrap my-16">
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold">How Web Works For You</h1>
        <p className="text-gray-600 w-[40vw]">
          Whether you're a fresh graduate, a career switcher, or a seasoned
          professional — our platform is designed to connect you with the right
          opportunities. From discovering job openings to applying with
          confidence, we streamline the process every step of the way.
        </p>
        <div className="mt-5 flex flex-col items-start justify-center gap-2">
          <div>
            <BiDoorOpen className="text-4xl w-16 p-[10px] h-16 text-red-600 bg-red-200 rounded-full border border-red-600 border-dashed" />
          </div>
          <h1 className="text-xl font-semibold">Find The Right Job</h1>
          <p className="text-gray-600 w-[40vw]">
            Explore thousands of verified job listings tailored to your skills,
            interests, and goals. Our advanced filtering and recommendation
            engine ensures you see the roles that match your profile best —
            saving time and effort.
          </p>
        </div>
        <div className="mt-5 flex flex-col items-start justify-center gap-2">
          <div>
            <IoSearch className="text-4xl w-16 p-[10px] h-16 text-red-600 bg-red-200 rounded-full border border-red-600 border-dashed" />
          </div>
          <h1 className="text-xl font-semibold">Research Companies</h1>
          <p className="text-gray-600 w-[40vw]">
            Make informed decisions by learning about company cultures, values,
            and reviews. Get insights into potential employers before applying
            and choose organizations that align with your work style and career
            aspirations.
          </p>
        </div>
        <div className="mt-5 flex flex-col items-start justify-center gap-2">
          <div>
            <IoDocumentTextOutline className="text-4xl w-16 p-[10px] h-16 text-red-600 bg-red-200 rounded-full border border-red-600 border-dashed" />
          </div>
          <h1 className="text-xl font-semibold">Save & Apply</h1>
          <p className="text-gray-600 w-[40vw]">
            Easily save jobs you’re interested in and apply when ready — with a
            single click. Keep track of your applications and get real-time
            updates, all in one place. No more missed deadlines or lost
            opportunities.
          </p>
        </div>
      </div>
      {/* RIGHT SIDE  */}
      <div>
        <img
          src={bannerImg3}
          alt=""
          className="w-[35rem]"
          style={{
            animation: "Flikker 6s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  );
};

export default HowWebWorks;
