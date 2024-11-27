import React from "react";
import { MdAttachMoney, MdCampaign, MdComputer, MdConstruction, MdLocalHospital, MdRoomService, MdSchool, MdShoppingCart } from "react-icons/md";

const PopularJobCategory = () => {
  const category = [
    {
      name: "Construction",
      jobs: "6 new jobs",
      image: <MdConstruction />,
    },
    {
      name: "Finance",
      jobs: "8 new jobs",
      image: <MdAttachMoney />,
    },
    {
      name: "Technology",
      jobs: "12 new jobs",
      image: <MdComputer />,
    },
    {
      name: "Healthcare",
      jobs: "15 new jobs",
      image: <MdLocalHospital />,
    },
    {
      name: "Education",
      jobs: "10 new jobs",
      image: <MdSchool />,
    },
    {
      name: "Marketing",
      jobs: "7 new jobs",
      image: <MdCampaign />,
    },
    {
      name: "Hospitality",
      jobs: "9 new jobs",
      image: <MdRoomService />,
    },
    {
      name: "Retail",
      jobs: "11 new jobs",
      image: <MdShoppingCart />,
    },
  ];

  return (
    <div className="my-28">
      <h1 className="text-3xl md:text-4xl font-semibold text-center">
        Popular Jobs Category
      </h1>
      <p className="text-center w-full sm:w-[70vw] md:w-[55vw] mx-auto mt-4 text-gray-600 px-4">
        Explore the most in-demand job categories tailored to a variety of
        skills and industries. Whether you're a tech enthusiast, creative
        professional, or skilled tradesperson, find the perfect role that aligns
        with your expertise and interests.
      </p>
      <div className="my-16 mx-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {category.map((item, index) => (
          <div
            key={index}
            className="group border border-red-600 border-dashed w-70 h-24 flex items-center justify-start gap-4 p-4 hover:text-white hover:bg-[#FD1616] transition-all duration-500"
          >
            <div className="text-4xl text-red-600 bg-red-200 p-4 rounded-full border border-red-600 border-dashed">
              {item.image}
            </div>
            <div>
              <h1 className="sm:text-base md:text-lg font-bold">{item.name}</h1>
              <p className="text-gray-500 group-hover:text-white transition-all duration-500">
                {item.jobs}
              </p>
            </div>
          </div>
        ))}
        {/* PK */}
      </div>
    </div>
  );
};

export default PopularJobCategory;
