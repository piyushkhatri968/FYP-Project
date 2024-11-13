import React from 'react'
import { FiFileText } from 'react-icons/fi';     // Icon for "Browse Job"
import { FiBriefcase } from 'react-icons/fi';    // Icon for "Find Your Vacancy"
import { FiSend } from 'react-icons/fi';         // Icon for "Submit Resume"

const steps = [
    {
      id: 1,
      title: "Browse Job",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: <FiFileText size={32} className="text-red-500" />,  // Icon for "Browse Job"
    },
    {
      id: 2,
      title: "Find Your Vacancy",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: <FiBriefcase size={32} className="text-red-500" />,  // Icon for "Find Your Vacancy"
    },
    {
      id: 3,
      title: "Submit Resume",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      icon: <FiSend size={32} className="text-red-500" />,       // Icon for "Submit Resume"
    },
  ];
function EasyToUse() {
  return (
    <div className="relative flex flex-col items-center justify-center py-16" style={{ backgroundImage: `url("https://templates.hibootstrap.com/jovie/default/assets/img/section-bg/1.jpg")`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-80"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-white mb-12">Easiest Way To Use</h2>
        
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="group relative bg-white bg-opacity-10 rounded-lg p-6 text-center transition-colors duration-300 shadow-lg w-64"
            >
              {/* Circle Icon with Number */}
              <div className="relative flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full border-4 border-dotted border-red-500 transition-colors duration-300 hover:bg-red-500 hover:border-transparent">
                {React.cloneElement(step.icon, { className: "text-red-500 group-hover:text-white" })}
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">{step.id}</span>
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              
              {/* Description */}
              <p className="text-gray-300 text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EasyToUse