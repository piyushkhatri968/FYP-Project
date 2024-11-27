import React from "react";
import compapnyImg from "../../assets/Images/Home/company.png";
import { IoLocationOutline } from "react-icons/io5";

function TopCompanies() {
  const Company = [
    {
      img: compapnyImg,
      name: "TechNova Solutions",
      location: "Silicon Valley, USA",
      vacancy: 15,
    },
    {
      img: compapnyImg,
      name: "Green Horizons",
      location: "Berlin, Germany",
      vacancy: 10,
    },
    {
      img: compapnyImg,
      name: "InnovateX",
      location: "Tokyo, Japan",
      vacancy: 20,
    },
    {
      img: compapnyImg,
      name: "FutureWorks",
      location: "Toronto, Canada",
      vacancy: 12,
    },
  ];
  return (
    <div>
      <h1 className="text-4xl font-semibold text-center">Top Companies</h1>
      <p className="text-center w-full sm:w-[35rem] mx-auto px-4 my-4 text-gray-600">
        Discover some of the top companies offering exciting career
        opportunities across the globe. Connect with leading organizations to
        take your career to the next level.
      </p>
      <div className="flex flex-wrap justify-center gap-6 my-12">
        {Company.map((item, index) => (
          <div
            key={index}
            className="group flex flex-col justify-center items-center gap-3 border border-dotted border-red-500 py-10 px-12 text-center "
          >
            <img
              src={item.img}
              alt="Company"
              className="w-[50px] h-[50px] object-cover"
            />
            <h1 className="text-2xl font-bold mt-1">{item.name}</h1>
            <p className="flex items-center justify-center gap-1 text-gray-600 font-medium">
              <span>
                <IoLocationOutline />
              </span>
              {item.location}
            </p>
            <p className="text-white bg-[#FD1616] py-2 px-5 mt-2 group-hover:bg-[#001935] transition-all duration-500">
              {item.vacancy} vacancies
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopCompanies;
