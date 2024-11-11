import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      className="relative flex items-center justify-center h-[50vh] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://templates.hibootstrap.com/jovie/default/assets/img/title-bg/1.jpg')",
      }}
    >
      {/* Color Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center justify-center text-gray-300 space-x-2">
          <Link to={"/"} className="text-white hover:text-red-500">
            Home
          </Link>

          <span className="text-white">&gt;</span>
          <span>About Us</span>
        </nav>
      </div>
    </section>
  );
}

export default Hero;
