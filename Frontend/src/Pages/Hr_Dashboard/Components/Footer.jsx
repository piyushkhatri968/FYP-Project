import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="bg-[#0d1b2a] text-white py-12">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo and About */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Logo</h2>
            <p className="text-gray-400 mb-4">
              Job Portal - Helping connect job seekers and recruiters efficiently.
            </p>
          </div>

          {/* Navbar Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-white inline-block pb-1">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-[#ff6347] hover:text-white">About</Link>
              </li>
              <li className="flex items-center gap-2 cursor-pointer text-[#ff6347] hover:text-white">
                <span>Jobs</span>
                <IoIosArrowDown />
              </li>
              <li>
                <Link to="/contact" className="text-[#ff6347] hover:text-white">Contact Us</Link>
              </li>
              <li>
                <Link to="/hr" className="text-[#ff6347] hover:text-white">HR-Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Sidebar Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-white inline-block pb-1">For HR Managers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-[#ff6347] hover:text-white">Manage Job Listings</Link>
              </li>
              <li>
                <Link to="#" className="text-[#ff6347] hover:text-white">Application Tracking</Link>
              </li>
              <li>
                <Link to="#" className="text-[#ff6347] hover:text-white">Candidate Profiles</Link>
              </li>
              <li>
                <Link to="#" className="text-[#ff6347] hover:text-white">Shortlisted Candidates</Link>
              </li>
              <li>
                <Link to="#" className="text-[#ff6347] hover:text-white">Account Settings</Link>
              </li>
              <li>
                <Link to="#" className="text-[#ff6347] hover:text-white">Notification Settings</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-5 border-b border-white inline-block pb-1">Contact Information</h3>
            <p className="flex items-center text-gray-400">
              <i className="fas fa-phone mr-2 text-[#ff6347]"></i> Phone: +101 984 754
            </p>
            <p className="flex items-center text-gray-400 mt-2">
              <i className="fas fa-envelope mr-2 text-[#ff6347]"></i> Email: FYP@info.com
            </p>
            <p className="flex items-center text-gray-400 mt-2">
              <i className="fas fa-map-marker-alt mr-2 text-[#ff6347]"></i> Address: Mithi Tharparkar
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
