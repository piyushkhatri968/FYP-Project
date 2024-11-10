import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <nav className="flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-20 bg-[#010C29] text-white h-[5rem] position-relative">
      <div className="logo">Logo</div>
      <div className="flex gap-10">
        <Link to="/about" className="font-semibold">
          About
        </Link>
        <Link to="/jobs" className="font-semibold">
          Jobs
        </Link>
        <Link to="/contact" className="font-semibold">
          Contact Us
        </Link>
      </div>
      {currentUser ? (
        <div onClick={handleModal}>
          <img
            src={currentUser.profilePicture}
            alt="user profile"
            className="w-10 h-10 rounded-full"
          />
          {openModal && <div className="absolute">{currentUser.name}</div>}
        </div>
      ) : (
        <div className="flex gap-3 items-center">
          <Link to="/signup" className="font-semibold">
            Sign Up
          </Link>
          <Link
            to="signin"
            className="font-semibold bg-[#ce2f2f] py-2 px-4 rounded-md"
          >
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
