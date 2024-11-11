import React from "react";
import { Link } from "react-router-dom";
import Theme from "../../Components/Theme";
import aboutUs from "../../assets/Images/aboutUs.jpg";

function Hero() {
  return (
    <>
      <Theme pageName="About Us" heroImage={aboutUs} />
    </>
  );
}

export default Hero;
