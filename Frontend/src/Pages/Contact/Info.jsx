import React from "react";
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
function Info() {
  const contactItems = [
    {
      icon: <FiPhone className="text-blue-600 text-2xl" />,
      lines: ["+1-456-644-7457", "+1-745-967-4567"]
    },
    {
      icon: <FiMail className="text-blue-600 text-2xl" />,
      lines: ["info@jovie.com", "hello@jovie.com"]
    },
    {
      icon: <FiMapPin className="text-blue-600 text-2xl" />,
      lines: ["123, Denver, USA", "Street view 3/B, USA"]
    }
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-10 mt-10">
      {contactItems.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl p-8 text-center flex flex-col items-center space-y-4 w-full md:w-64"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-dashed border-blue-600">
            {item.icon}
          </div>
          <div className="text-gray-800">
            {item.lines.map((line, i) => (
              <p
                key={i}
                className="text-sm font-medium hover:text-red-600 transition-colors duration-300"
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Info;
