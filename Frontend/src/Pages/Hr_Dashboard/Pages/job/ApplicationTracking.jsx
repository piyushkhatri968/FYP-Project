import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUserTie,
  FaClipboardCheck,
  FaCheckCircle,
  FaUserCheck,
} from "react-icons/fa";

const ApplicationTracking = () => {
  const [applications, setApplications] = useState([]);
  // const user = useSelector((state) => state.user.currentUser);
  
  // const hrId = user._id; 
  // Fetch applications from the backend
  const fetchApplications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/application/candidate/getApplication"
      );
      setApplications(response.data); // Set fetched applications to state
      console.log("Fetched applications:", response.data); // Debugging
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };
  
  // const fetchApplications = async (hrId, setApplications) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:8080/api/application/candidate/getApplication?hrId=${hrId}`
  //     );
  
  //     setApplications(response.data);
  //     console.log("Fetched applications:", response.data);
  //   } catch (error) {
  //     console.error("Error fetching applications:", error);
  //   }
  // };
  
 

  useEffect(() => {
    fetchApplications();
  }, []);

  // Define application stages
  const stages = [
    { id: "applied", label: "Applied", color: "bg-gray-300", icon: FaUserTie },
    {
      id: "shortlisted",
      label: "Shortlisted",
      color: "bg-green-500",
      icon: FaCheckCircle,
    },
    {
      id: "rejected",
      label: "Rejected",
      color: "bg-red-400",
      icon: FaClipboardCheck,
    },
    { id: "hired", label: "Hired", color: "bg-yellow-500", icon: FaUserCheck },
  ];

  // Count applications for each stage
  const stageCounts = stages.map((stage) => ({
    ...stage,
    count: applications.filter(
      (app) => app.status?.toLowerCase() === stage.id
    ).length,
  }));

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen p-6 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
          Application Tracking
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stageCounts.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.id}
                className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg flex flex-col items-center transition-transform transform hover:scale-105"
              >
                <div
                  className={`flex items-center justify-center w-16 h-16 rounded-full text-white ${stage.color} mb-4`}
                >
                  <Icon size={32} />
                </div>
                <h4 className="text-lg font-bold text-gray-800">
                  {stage.label}
                </h4>
                <p
                  className={`text-2xl font-extrabold text-gray-900 mt-2 ${stage.color}`}
                >
                  {stage.count}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ApplicationTracking;
