
import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import loaderAnimation from "../../../assets/animation/Animation - 1746020211604.json";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Player
        autoplay
        loop
        src={loaderAnimation}
        style={{ height: "200px", width: "200px" }}
      />
    </div>
  );
};

export default Loader;
