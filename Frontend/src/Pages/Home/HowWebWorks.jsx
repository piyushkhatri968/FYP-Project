import React from "react";
import bannerImg3 from "../../assets/Images/Home/banner-img-3.png";
import { BiDoorOpen } from "react-icons/bi";
const HowWebWorks = () => {
  return (
    <div className="flex justify-center items-center my-16">
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold text-center">
          How Web Works For You
        </h1>
        <p className="text-gray-600 w-[40vw]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
          spendisse ultrices gravida. Risus commodo viverra.
        </p>
        <div className="mt-5 flex flex-col items-start justify-center gap-2">
          <div>
            <BiDoorOpen className="text-4xl w-16 p-[10px] h-16 text-red-600 bg-red-200 rounded-full border border-red-600 border-dashed" />
          </div>
          <h1 className="text-xl font-semibold">Find The Right Job</h1>
          <p className="text-gray-600 w-[40vw]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. ipsum
            suspendisse ultrices.
          </p>
        </div>
        <div className="mt-5 flex flex-col items-start justify-center gap-2">
          <div>
            <BiDoorOpen className="text-4xl w-16 p-[10px] h-16 text-red-600 bg-red-200 rounded-full border border-red-600 border-dashed" />
          </div>
          <h1 className="text-xl font-semibold">Find The Right Job</h1>
          <p className="text-gray-600 w-[40vw]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. ipsum
            suspendisse ultrices.
          </p>
        </div>
        <div className="mt-5 flex flex-col items-start justify-center gap-2">
          <div>
            <BiDoorOpen className="text-4xl w-16 p-[10px] h-16 text-red-600 bg-red-200 rounded-full border border-red-600 border-dashed" />
          </div>
          <h1 className="text-xl font-semibold">Find The Right Job</h1>
          <p className="text-gray-600 w-[40vw]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. ipsum
            suspendisse ultrices.
          </p>
        </div>
      </div>
      {/* RIGHT SIDE  */}
      <div>
        <img
          src={bannerImg3}
          alt=""
          className="w-[40vw]"
          style={{
            animation: "Flikker 6s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  );
};

export default HowWebWorks;
