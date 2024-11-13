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
      <p className="text-center max-w-[60vw] mx-auto mt-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est illum nisi
        ullam odio quam error laboriosam molestiae hic temporibus, perspiciatis
        suscipit ducimus maiores dolore quibusdam.
      </p>
      <div className=" m-16 grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {category.map((item, index) => (
          <div
            key={index}
            className="border border-red-600 border-dashed w-70 h-24 flex items-center justify-start gap-4 p-4"
          >
            <div className="text-4xl text-red-600 bg-red-200 p-4 rounded-full border border-red-600 border-dashed">
              {item.image}
            </div>
            <div>
              <h1 className="text-xl font-bold">{item.name}</h1>
              <p>{item.jobs}</p>
            </div>
          </div>
        ))}
        {/* PK */}
      </div>
    </div>
  );
};

export default PopularJobCategory;
