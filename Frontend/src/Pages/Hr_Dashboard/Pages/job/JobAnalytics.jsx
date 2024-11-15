// JobAnalytics.js
import React from 'react';

const JobAnalytics = ({ analytics }) => {
    const analyticses = {
        totalApplications: 120,
        shortlistedCandidates: 30,
        hiredCandidates: 5,
        views: 500,
      };
      
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-6">Job Analytics</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded shadow text-center">
          <h4 className="text-lg font-semibold text-blue-700">Total Applications</h4>
          <p className="text-3xl font-bold text-blue-700">{analyticses.totalApplications || 0}</p>
        </div>

        <div className="bg-green-100 p-4 rounded shadow text-center">
          <h4 className="text-lg font-semibold text-green-700">Shortlisted Candidates</h4>
          <p className="text-3xl font-bold text-green-700">{analyticses.shortlistedCandidates || 0}</p>
        </div>

        <div className="bg-purple-100 p-4 rounded shadow text-center">
          <h4 className="text-lg font-semibold text-purple-700">Hired Candidates</h4>
          <p className="text-3xl font-bold text-purple-700">{analyticses.hiredCandidates || 0}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded shadow text-center">
          <h4 className="text-lg font-semibold text-yellow-700">Job Views</h4>
          <p className="text-3xl font-bold text-yellow-700">{analyticses.views || 0}</p>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
        <h4 className="text-lg font-semibold text-gray-700 mb-4">Application Trends</h4>
        <p className="text-gray-600">[Chart Placeholder]</p>
        <p className="text-gray-500 text-sm">Visualize application trends here</p>
      </div>
    </div>
  );
};

export default JobAnalytics;
