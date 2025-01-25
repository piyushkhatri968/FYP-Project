import React, { useState, useEffect } from "react";
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
import JobRecruitment from "./JobRecruitment";

import { useSelector } from "react-redux";
import ProfileCompletionPopup from "../../Components/ProfileCompletionPopup";
import axios from "axios";

function HomePage() {
  const { currentUser } = useSelector((state) => state.user);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const checkUserInfo = async () => {
      if (currentUser) {
        if (currentUser.userType === "employee") {
          try {
            const response = await axios.get(
              `http://localhost:8080/api/candidate/getData/${currentUser.candidateDetails}`
            );
            const { position, skills } = response.data.data;
            if (!position || (Array.isArray(skills) && skills.length === 0)) {
              setShowPopup(true);
            } else {
              setShowPopup(false);
            }
          } catch (error) {
            console.error("Error fetching employee data:", error);
          }
        }
      }
    };
    checkUserInfo();
  }, []);
  return (
    <>
      {showPopup && <ProfileCompletionPopup />}
      <Hero />
      <JobSearch />
      <PopularJobCategory />

      {/* TALENDTED DESIGNERS  */}
      <div className="flex items-center justify-center flex-wrap lg:flex-nowrap gap-12 md:gap-16 lg:gap-20 mb-20">
        <div className="w-[20rem] sm:w-[25rem] md:w-[20rem] lg:w-[27rem] pl-8">
          <img
            src={bannerImg2}
            alt=""
            style={{
              animation: "Flikker 6s ease-in-out infinite",
            }}
            draggable="false"
          />
        </div>
        <div className="flex flex-col gap-5 px-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight ">
            Discover The Talented Designers In The World
          </h1>
          <p className="text-gray-800 text-base lg:w-[40rem]">
            Explore the most in-demand job categories tailored to a variety of
            skills and industries. Whether you're a tech enthusiast, creative
            professional, or skilled tradesperson, find the perfect role that
            aligns with your expertise and interests.
          </p>
          <p className="text-gray-800  text-base lg:w-[40rem]">
            Our curated categories make it simple to navigate the job market and
            discover opportunities that suit your career goals. Start exploring
            now and take the first step toward your dream job!
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
      {currentUser ? <JobRecruitment /> : null}
      <Reviews />
      <SubscribeBox />
    </>
  );
}

export default HomePage;
