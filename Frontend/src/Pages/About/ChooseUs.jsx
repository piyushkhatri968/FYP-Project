import React from 'react'
import { FaFileAlt, FaUserTie, FaBriefcase } from "react-icons/fa";

function ChooseUs() {
  const features = [
    {
      icon: <FaFileAlt />,
      title: "Advertise Job",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    },
    {
      icon: <FaUserTie />,
      title: "Recruiter Profiles",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    },
    {
      icon: <FaBriefcase />,
      title: "Find Your Dream Job",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    },
  ];

  return (
    <section className="py-16 bg-white text-center">
      <div className="max-w-4xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Why You Choose Us Among Other Job Sites?
        </h2>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus.
        </p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group border border-dotted border-red-500 rounded-lg p-8 text-center transition-all duration-300 hover:bg-red-500"
          >
            <div className="flex justify-center items-center text-red-500 text-5xl mb-4 group-hover:text-white">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-white">
              {feature.title}
            </h3>
            <p className="text-gray-600 group-hover:text-white">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ChooseUs;