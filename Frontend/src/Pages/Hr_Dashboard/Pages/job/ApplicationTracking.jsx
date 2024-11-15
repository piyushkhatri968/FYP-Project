// ApplicationTracking.js
import React from 'react';

const ApplicationTracking = ({ application }) => {
    const applications = [
        { id: 1, name: 'Alice Johnson', stage: 'applied' },
        { id: 2, name: 'Bob Smith', stage: 'interviewed' },
        { id: 3, name: 'Carol Danvers', stage: 'shortlisted' },
        { id: 4, name: 'David Brown', stage: 'hired' },
        { id: 5, name: 'Eve White', stage: 'applied' },
      ];
      
  const stages = [
    { id: 'applied', label: 'Applied', color: 'bg-gray-300' },
    { id: 'interviewed', label: 'Interviewed', color: 'bg-blue-400' },
    { id: 'shortlisted', label: 'Shortlisted', color: 'bg-green-500' },
    { id: 'hired', label: 'Hired', color: 'bg-yellow-500' },
  ];

  const stageCounts = stages.map((stage) => ({
    ...stage,
    count: applications.filter((app) => app.stage === stage.id).length,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-6">Application Tracking</h3>
      
      <div className="space-y-4">
        {stageCounts.map((stage) => (
          <div
            key={stage.id}
            className="flex items-center justify-between bg-gray-100 p-4 rounded shadow"
          >
            <span className={`font-semibold text-gray-800`}>{stage.label}</span>
            <div className="flex items-center space-x-4">
              <span
                className={`text-white px-4 py-1 rounded-full ${stage.color}`}
              >
                {stage.count}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationTracking;
