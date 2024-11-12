import React from "react";
import ChooseUs from "./ChooseUs";
import Description from "./Description";
import Hero from "./Hero";
import Stats from "./Stats";
function AboutPage() {
  return (
    <div>
      <Hero />
      <Description />
      <ChooseUs />
      <Stats />
    </div>
  );
}

export default AboutPage;
