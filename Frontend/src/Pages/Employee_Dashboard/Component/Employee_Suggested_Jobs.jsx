import React from "react";
import { FaBookmark, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const jobs = [
  {
    id: 1,
    company_logo:
      "https://ilcdnstatic.investorslounge.com//ResearchImages/FullImage//928341dd-c69f-454a-92ac-c9e75c073f31.png",
    title: "Backend Developer",
    company: "Systems Limited",
    location: "Karachi, Pakistan",
    postedTime: "3 days ago",
    description:
      "Systems Limited is seeking a Backend Developer to design and maintain server-side logic, databases, and APIs. Join our team in Karachi, Pakistan, and collaborate with front-end developers to create scalable and efficient solutions.",
    skills: ["PHP", "Laravel", "CSS", "React"],
    salary: "$15k-20k/month",
    experience: "2-3 years",
  },
  {
    id: 2,
    company_logo:
      "https://ilcdnstatic.investorslounge.com//ResearchImages/FullImage//928341dd-c69f-454a-92ac-c9e75c073f31.png",
    title: "Frontend Developer",
    company: "TechSoft Solutions",
    location: "New York, USA",
    postedTime: "5 days ago",
    description:
      "TechSoft Solutions is seeking a Frontend Developer who is skilled in React and CSS frameworks. Join our innovative team to build user-friendly and performant web applications.",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    salary: "$10k-15k/month",
    experience: "1-2 years",
  },
];

const JobList = () => {
  return (
    <div className="p-6 min-h-screen shadow-2xl rounded-2xl">
      <h1 className="text-2xl font-bold mb-6">
        Job's That Matches Your Profile
      </h1>
      <div className="space-y-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-6 rounded-lg border-2 hover:shadow-lg transition-shadow"
          >
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
              {/* Logo and Title Section */}
              <div className="flex items-center gap-4">
                <div className="bg-gray-200 w-28 h-20 rounded-md flex justify-center items-center">
                  <img
                    src={job.company_logo}
                    alt=""
                    className="w-24 h-16 rounded-md object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{job.title}</h2>
                  <p className="text-gray-500 text-sm flex gap-2 items-center">
                    {job.company} •{" "}
                    <FaMapMarkerAlt className="inline text-red-500" />{" "}
                    {job.location} •{" "}
                    <FaClock className="inline text-yellow-500" />{" "}
                    {job.postedTime}
                  </p>
                </div>
              </div>
              {/* Save Job Icon */}
              <FaBookmark className="text-gray-400 hover:text-blue-500 cursor-pointer text-2xl" />
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-4">{job.description}</p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Footer Section */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2 justify-center items-center flex-wrap">
                <p className="text-gray-700 font-bold">{job.salary}</p>
                <p className="text-gray-500 text-sm">
                  {job.experience} experience
                </p>
              </div>
              <div className="flex gap-4">
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
                  View Details
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
