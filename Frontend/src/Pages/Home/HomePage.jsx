import React from "react";
import Hero from "./Hero";

import TopCompanies from "./TopCompanies";
import JobSearch from "../Jobs/FinaAJob/Components/JobSearch";
import PopularJobCategory from "../Jobs/FinaAJob/Components/PopularJobCategory";
import { Link } from "react-router-dom";
import bannerImg2 from "../../assets/Images/Home/banner-img-2.png";
import InterestedJobs from "../../Components/InterestedJobs";
import Stats from "../About/Stats";
import Reviews from "../About/Reviews";
import HowWebWorks from "./HowWebWorks";
import SubscribeBox from "../../Components/SubscribeBox ";

function HomePage() {
  return (
    <>
      <Hero />
      <JobSearch />
      <PopularJobCategory />

      {/* TALENDTED DESIGNERS  */}
      <div className="flex items-center justify-center gap-48 mb-20">
        <div>
          <img
            src={bannerImg2}
            alt=""
            className="w-[30vw]"
            style={{
              animation: "Flikker 6s ease-in-out infinite",
            }}
          />
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-semibold w-[40vw] leading-tight">
            Discover The Talented Designers In The World
          </h1>
          <p className="text-gray-800 w-[40vw] text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
            ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
            accumsan lacus vel facilisis.
          </p>
          <p className="text-gray-800 w-[40vw] text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
            ipsum suspendisse ultrices gravida.
          </p>
          <Link
            to="/find-job"
            className="text-center font-semibold text-md bg-[#FD1616] text-white px-2 py-3 w-40 hover:bg-[#011935] transition-all duration-500"
          >
            Find A Job
          </Link>
        </div>
      </div>
      <InterestedJobs />
      <TopCompanies />
      <Stats />
      <HowWebWorks />
      <Reviews />
      <SubscribeBox />
    </>
  );
}

export default HomePage;
