import React from "react";

function Description() {
    return (
        <div className="flex justify-center px-4 py-12 bg-white-100">
          <div className="flex flex-col md:flex-row items-start max-w-6xl w-full bg-gray shadow-lg rounded-lg p-8 md:p-12">
            
            {/* Left Section (Text Content) */}
            <div className="md:w-1/2 pr-0 md:pr-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How We Started</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                It is a long established fact that a reader will be distracted by the readable
                content of a page when looking at its layout. The point of using Lorem Ipsum is
                that it has a more-or-less normal distribution of letters, as opposed to using
                'Content here, content here', making it look like readable English.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                has been the industry's standard dummy text ever since the 1500s.
              </p>
            </div>
    
            {/* Right Section (Image Content) */}
            <div className="md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0">
              <img
                src="https://templates.hibootstrap.com/jovie/default/assets/img/about.jpg"  
                alt="Team"
                className="w-full max-w-sm h-80 object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      );
}

export default Description;
// hr
