import React from "react";
import ChooseUs from "./ChooseUs";
import Description from "./Description";
import Hero from "./Hero";
import Stats from "./Stats";
import Reviews from "./Reviews";
import EasyToUse from "./EasyToUse";
function AboutPage() {
  return (
    <div>
      <Hero />
      <Description />
      <EasyToUse/>
      <ChooseUs />
      <Stats />
      <Reviews/>
    </div>
  );
}

export default AboutPage;
// hello