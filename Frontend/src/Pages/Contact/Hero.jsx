import React from 'react'
import Theme from './../../Components/Theme';
import HeroPic from "../../assets/Images/contact-hero.jpg";

function Hero() {
    return (
       <>
       <Theme heroImage={HeroPic} pageName="Contact Us" />
       </>
        
      );
}

export default Hero;