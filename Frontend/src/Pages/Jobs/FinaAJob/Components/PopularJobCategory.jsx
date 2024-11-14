import React from "react";
import { MdConstruction } from "react-icons/md";
import { MdDocumentScanner } from "react-icons/md";

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
      image: <MdDocumentScanner />,
    },
    {
      name: "Finance",
      jobs: "8 new jobs",
      image: <MdDocumentScanner />,
    },
    {
      name: "Finance",
      jobs: "8 new jobs",
      image: <MdDocumentScanner />,
    },
    {
      name: "Finance",
      jobs: "8 new jobs",
      image: <MdDocumentScanner />,
    },
    {
      name: "Finance",
      jobs: "8 new jobs",
      image: <MdDocumentScanner />,
    },
    {
      name: "Finance",
      jobs: "8 new jobs",
      image: <MdDocumentScanner />,
    },
    {
      name: "Finance",
      jobs: "8 new jobs",
      image: <MdDocumentScanner />,
    },
  ];
  return (
    <div className="my-28">
      <h1 className="text-4xl font-semibold text-center">
        Popular Jobs Category
      </h1>
      <p className="text-center max-w-[50vw] mx-auto mt-4 text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
        suspendisse ultrices gravida. Risus
      </p>
      <div className=" m-16 grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {category.map((item, index) => (
          <div
            key={index}
            className="group border border-red-600 border-dashed w-70 h-24 flex items-center justify-start gap-4 p-4 hover:text-white hover:bg-[#FD1616] transition-all duration-500"
          >
            <div className="text-4xl text-red-600 bg-red-200 p-4 rounded-full border border-red-600 border-dashed">
              {item.image}
            </div>
            <div>
              <h1 className="text-xl font-bold">{item.name}</h1>
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
