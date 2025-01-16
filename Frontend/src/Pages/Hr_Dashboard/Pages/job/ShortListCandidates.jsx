import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaCalendarAlt, FaFilter } from "react-icons/fa";
import InterviewScheduling from "./InterviewScheduling"

const ShortlistCandidates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPosition, setFilterPosition] = useState("");
  const [filterExperience, setFilterExperience] = useState("");
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [shortlistedCandidates, setShortlistedCandidates] = useState([]);
  const [modalCandidate, setModalCandidate] = useState(null);
 
  const [showInterviewModal, setShowInterviewModal] = useState(false);

  // Fetch shortlisted candidates
  useEffect(() => {
    const fetchShortlistedCandidates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/application/candidate/shortlisted-candidates"
        );
        setShortlistedCandidates(response.data);
      } catch (error) {
        console.error("Error fetching shortlisted candidates:", error);
      }
    };

    fetchShortlistedCandidates();
  }, []);

  // Define experience ranges
  const experienceRanges = [
    { label: "Fresh Graduates", value: "0" },
    { label: "1-2 Years", value: "1" },
    { label: "3-4 Years", value: "3" },
    { label: "5+ Years", value: "5" },
  ];

  // Filter candidates
  const filteredCandidates = shortlistedCandidates.filter((candidate) => {
    const { userId } = candidate;
    const candidateName = userId?.userId?.name?.toLowerCase() || "";
    const jobPosition = userId?.position || "";
    const candidateExperience = userId?.experience || 0;

    return (
      candidateName.includes(searchQuery.toLowerCase()) &&
      (filterPosition === "" || jobPosition === filterPosition) &&
      (filterExperience === "" ||
        (filterExperience === "0" && candidateExperience === 0) ||
        (filterExperience === "1" &&
          candidateExperience >= 1 &&
          candidateExperience <= 2) ||
        (filterExperience === "3" && candidateExperience >= 3))
    );
  });

  // Toggle candidate selection
  const toggleSelection = (id) => {
    setSelectedCandidates((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((candidateId) => candidateId !== id)
        : [...prevSelected, id]
    );
  };
 // Handle scheduling interview button click
 const handleScheduleInterview = (candidate) => {
  setModalCandidate(candidate);
  setShowInterviewModal(true);
};

  // Modal handlers
  const openModal = (candidate) => setModalCandidate(candidate);
  const closeModal = () => setModalCandidate(null);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h3 className="text-2xl font-bold mb-6">Shortlisted Candidates</h3>

      {/* Search & Filter Section */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Search Input */}
        <div className="flex items-center gap-2 bg-white p-2 rounded shadow-md">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search candidates"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="outline-none"
          />
        </div>

        {/* Position Filter */}
        <div className="flex items-center gap-2 bg-white p-2 rounded shadow-md">
          <FaFilter className="text-gray-500" />
          <select
            value={filterPosition}
            onChange={(e) => setFilterPosition(e.target.value)}
            className="outline-none"
          >
            <option value="">Filter by Position</option>
            {[...new Set(shortlistedCandidates.map((c) => c.userId.position))].map(
              (position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              )
            )}
          </select>
        </div>

        {/* Experience Filter */}
        <div className="flex items-center gap-2 bg-white p-2 rounded shadow-md">
          <FaFilter className="text-gray-500" />
          <select
            value={filterExperience}
            onChange={(e) => setFilterExperience(e.target.value)}
            className="outline-none"
          >
            <option value="">Filter by Experience</option>
            {experienceRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Candidates List or No Match Message */}
      {filteredCandidates.length > 0 ? (
        <div className="space-y-4">
          {filteredCandidates.map((candidate) => {
            const { userId } = candidate;
            return (
              <div
                key={candidate._id}
                className="flex items-center justify-between p-4 bg-white rounded shadow-md"
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={selectedCandidates.includes(candidate._id)}
                    onChange={() => toggleSelection(candidate._id)}
                  />
                  <div>
                    <h4 className="font-bold">{userId?.userId?.name}</h4>
                    <p className="text-gray-600">{userId?.position}</p>
                    <p className="text-gray-600">
                      Experience: {userId?.experience || 0} years
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openModal(candidate)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    View Profile
                  </button>
                  <button
              onClick={() => handleScheduleInterview(candidate)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <FaCalendarAlt className="inline mr-1" /> Schedule Interview
            </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-gray-600 p-6">
          <p className="text-lg font-medium">
            No candidates found matching the current filters.
          </p>
          <br />
          <p className="fs-7"><strong>NOT FOUND</strong> </p>
        </div>
      )}

      {/* Candidate Details Modal */}
      {modalCandidate && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
            <h4 className="text-xl font-bold">
              Name: {modalCandidate.userId?.userId?.name}
            </h4>
            <p>
              <strong>Email:</strong> {modalCandidate.userId?.userId?.email}
            </p>
            <p>
              <strong>Skills:</strong> {modalCandidate.userId?.skills || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong> {modalCandidate.userId?.phone || "N/A"}
            </p>
            <p>
              <strong>Position:</strong> {modalCandidate.userId?.position}
            </p>
            <p>
              <strong>Experience:</strong> {modalCandidate.userId?.experience}{" "}
              years
            </p>
            <p>
              <strong>Social Links:</strong>{" "}
              {modalCandidate.userId?.socialLinks || "N/A"}
            </p>
            <p className="text-green-600 font-semibold mt-4">
              Status: Shortlisted
            </p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Interview Scheduling Modal */}
      {showInterviewModal && (
        <InterviewScheduling
          candidate={modalCandidate}
          closeModal={closeModal}
        />
      )}
      
    </div>
  );
};

export default ShortlistCandidates;
