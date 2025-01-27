import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="h-[60vh] flex flex-col justify-center items-center bg-gray-200">
      <h1 className="text-2xl font-semibold text-center">The page you are trying to access is not found !</h1>
      <Link to="/" className="bg-green-600 text-white p-4 rounded-full mt-5 hover:bg-green-700 font-semibold">Go To Home Page</Link>
    </div>
  );
};

export default NotFoundPage;
