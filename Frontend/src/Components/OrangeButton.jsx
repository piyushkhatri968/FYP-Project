import React, { useEffect, useState } from "react";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

const OrangeButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div
      onClick={scrollToTop}
      className={`OrangeButton fixed z-50 bottom-6 right-6 bg-OrangeColor w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transform rotate-180 shadow-lg hover:bg-orange-600 transition-all duration-300 ${
        isVisible ? "visiblebutton" : "invisiblebutton"
      }`}
    >
      <MdKeyboardDoubleArrowUp
        className="text-3xl text-white "
        style={{
          animation: "ArrowFlikker 2s ease-in-out infinite",
        }}
      />
    </div>
  );
};

export default OrangeButton;
