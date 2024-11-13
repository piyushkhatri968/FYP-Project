import React from 'react'
import Slider from "react-slick";
import { FaQuoteLeft } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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
        // Add more reviews here
      ];
    
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
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
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.
            </p>
          </div>
          <Slider {...settings} className="max-w-6xl mx-auto px-4">
            {reviews.map((review, index) => (
              <div key={index} className="p-6">
                <div className="bg-pink-100 hover:bg-red-500 transition-all duration-300 rounded-lg p-6">
                  <FaQuoteLeft className="text-red-500 text-2xl mb-4" />
                  <p className="text-gray-700 hover:text-white mb-6">
                    {review.text}
                  </p>
                  <h3 className="font-bold text-gray-800 hover:text-white">{review.name}</h3>
                  <p className="text-gray-600 hover:text-white">{review.position}</p>
                </div>
              </div>
            ))}
          </Slider>
        </section>
      );
    };


export default Reviews