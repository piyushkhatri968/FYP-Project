import React from 'react';
import Slider from "react-slick";
import { FaQuoteLeft, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Reviews() {
  const reviews = [
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do mod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
      name: "Alisa Meair",
      position: "CEO of Company",
    },
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do mod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
      name: "Adam Smith",
      position: "Web Developer",
    },
    // Add more reviews 
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="py-16 bg-white text-center">
      <div className="max-w-4xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          What Clients Say About Us
        </h2>
        <p className="text-gray-600 px-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <div key={index} className="p-6">
              <div className="bg-pink-100 hover:bg-red-500 transition-all duration-300 rounded-lg p-6">
                <FaQuoteLeft className="text-red-500 hover:text-white text-2xl mb-4" />
                <p className="text-gray-700 hover:text-white mb-6">
                  {review.text}
                </p>
                <h3 className="font-bold text-gray-800 hover:text-white">{review.name}</h3>
                <p className="text-gray-600 hover:text-white">{review.position}</p>
              </div>
            </div>
          ))}
        </Slider>

        {/* Custom Arrows Below Slider */}
        <div className="flex justify-center items-center mt-4 space-x-4">
          <button
            className="text-gray-600 hover:bg-red-500 hover:text-white rounded-full p-2 transition-colors duration-300"
            onClick={() => document.querySelector('.slick-prev').click()}
          >
            <FaArrowLeft size={24} />
          </button>
          <button
            className="text-gray-600 hover:bg-red-500 hover:text-white rounded-full p-2 transition-colors duration-300"
            onClick={() => document.querySelector('.slick-next').click()}
          >
            <FaArrowRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Reviews;
