import React from "react";
import companyImg from "../assets/Images/Jobs/CompanyImg.png";
import { CiLocationOn } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import { CiClock1 } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";

const InterestedJobs = () => {
  const Jobs = [
    {
      jobImage: companyImg,
      jobName: "Post-Room Operate",
      companyName: "Tour Design LTD",
      location: "Wellesley Rd, London",
      tag: "Accountancy",
      work_schedules: "Full Time",
      posted_at: "1 Hr Ago",
    },
    {
      jobImage: companyImg,
      jobName: "Customer Service Assistant",
      companyName: "Unity Solutions",
      location: "Oxford St, London",
      tag: "Customer Service",
      work_schedules: "Part Time",
      posted_at: "2 Hrs Ago",
    },
    {
      jobImage: companyImg,
      jobName: "Software Developer",
      companyName: "Techwave Ltd",
      location: "Manchester, UK",
      tag: "IT & Software",
      work_schedules: "Full Time",
      posted_at: "5 Hrs Ago",
    },
    {
      jobImage: companyImg,
      jobName: "Graphic Designer",
      companyName: "Creative Edge",
      location: "Bristol, UK",
      tag: "Design",
      work_schedules: "Remote",
      posted_at: "1 Day Ago",
    },
    {
      jobImage: companyImg,
      jobName: "Marketing Coordinator",
      companyName: "Bright Marketing Co.",
      location: "Leeds, UK",
      tag: "Marketing",
      work_schedules: "Hybrid",
      posted_at: "3 Days Ago",
    },
    {
      jobImage: companyImg,
      jobName: "Data Analyst",
      companyName: "Insight Data Ltd",
      location: "Liverpool, UK",
      tag: "Analytics",
      work_schedules: "Full Time",
      posted_at: "4 Days Ago",
    },
    {
      jobImage: companyImg,
      jobName: "Sales Representative",
      companyName: "Prime Sales Solutions",
      location: "Cambridge, UK",
      tag: "Sales",
      work_schedules: "Part Time",
      posted_at: "6 Hrs Ago",
    },
    {
      jobImage: companyImg,
      jobName: "HR Assistant",
      companyName: "People First Ltd",
      location: "Birmingham, UK",
      tag: "Human Resources",
      work_schedules: "Full Time",
      posted_at: "2 Days Ago",
    },
  ];
  return (
    <div className="my-10 mx-auto px-8 md:px-12">
      <h1 className="text-3xl md:text-4xl font-semibold text-center">
        Jobs You May Be Interested In
      </h1>
      <p className="text-center md:max-w-[50vw] mx-auto my-4 text-gray-600">
        Based on your skills and preferences, we've handpicked these job
        opportunities just for you. Browse through and apply to roles that align
        with your career aspirations and expertise.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-16 mx-4 sm:mx-12 md:mx-0 text-center md:text-left">
        {Jobs.map((job, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-[#FDE7E7] p-6 gap-6 md:gap-0 flex-col md:flex-row"
          >
            {/* Company Image */}
            <div className="md:w-[6rem] md:h-[5rem] w-full h-[3.8rem] bg-white flex items-center justify-center rounded-md border border-dashed border-gray-300">
              <img
                src={job.jobImage}
                alt="Company Logo"
                className="w-10 h-10"
                draggable="false"
              />
            </div>

            {/* Job Details */}
            <div className="flex flex-col justify-center items-center md:justify-normal md:items-start md:flex-1 pl-8 gap-1">
              <h2 className="text-lg font-bold">{job.jobName}</h2>
              <p className="text-sm ">
                Via <span className="text-red-500">{job.companyName}</span>
              </p>
              <div className="text-gray-500 flex items-center space-x-1 mt-1">
                <CiLocationOn className="text-gray-600 text-lg" />
                <span>{job.location}</span>
              </div>
              <div className="text-gray-500 flex items-center space-x-1">
                <CiFilter className="text-gray-600 text-lg" />
                <span>{job.tag}</span>
              </div>
            </div>

            {/* Right Section (Status and Like Icon) */}
            <div className="flex flex-col justify-center items-center gap-2 md:gap-4">
              <div className="text-red-600 bg-white py-2 px-8 border rounded-xl text-sm">
                {job.work_schedules}
              </div>
              <div className=" flex justify-center ">
                <CiHeart className="text-gray-500 text-2xl bg-white border rounded-lg" />
              </div>
              <div className="flex justify-center items-center gap-2 text-gray-500">
                <CiClock1 />
                <span>{job.posted_at}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterestedJobs;
