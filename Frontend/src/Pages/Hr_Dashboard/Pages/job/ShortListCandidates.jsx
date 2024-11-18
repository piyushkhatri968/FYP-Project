import React, { useState } from "react";
import { FaUser, FaSearch, FaCheck, FaCalendarAlt, FaFilter } from "react-icons/fa";


const ShortlistCandidates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPosition, setFilterPosition] = useState("");
  const [filterExperience, setFilterExperience] = useState("");
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [modalCandidate, setModalCandidate] = useState(null);

  const candidates = [
    {
      id: 1,
      name: "Alice Johnson",
      position: "Frontend Developer",
      experience: 3,
      isShortlisted: true,
    },
    {
      id: 2,
      name: "Carol Danvers",
      position: "Data Scientist",
      experience: 2,
      isShortlisted: true,
    },
    {
      id: 3,
      name: "Bob Smith",
      position: "Backend Developer",
      experience: 0,
      isShortlisted: false,
    },
  ];

  const positions = ["Frontend Developer", "Data Scientist", "Backend Developer"];
  const experienceLevels = [
    { label: "Fresh Graduates", value: 0 },
    { label: "1-2 Years", value: 1 },
    { label: "3+ Years", value: 3 },
  ];

  // Filtered and searched candidates
  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterPosition === "" || candidate.position === filterPosition) &&
      (filterExperience === "" ||
        (filterExperience === "0" && candidate.experience === 0) ||
        (filterExperience === "1" && candidate.experience >= 1 && candidate.experience <= 2) ||
        (filterExperience === "3" && candidate.experience >= 3))
  );

  const openModal = (candidate) => setModalCandidate(candidate);
  const closeModal = () => setModalCandidate(null);

  const toggleSelection = (id) => {
    setSelectedCandidates((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((candidateId) => candidateId !== id)
        : [...prevSelected, id]
    );
  };

  const handleBulkEmail = () => alert("Bulk Email Sent");
  const handleScheduleInterview = () => alert("Interviews Scheduled");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h3 className="text-2xl font-bold mb-6">Shortlisted Candidates</h3>

      {/* Search & Filter Section */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
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

        <div className="flex items-center gap-2 bg-white p-2 rounded shadow-md">
          <FaFilter className="text-gray-500" />
          <select
            value={filterPosition}
            onChange={(e) => setFilterPosition(e.target.value)}
            className="outline-none"
          >
            <option value="">Filter by Position</option>
            {positions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 bg-white p-2 rounded shadow-md">
          <FaFilter className="text-gray-500" />
          <select
            value={filterExperience}
            onChange={(e) => setFilterExperience(e.target.value)}
            className="outline-none"
          >
            <option value="">Filter by Experience</option>
            {experienceLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Candidates List */}
      <div className="space-y-4">
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate.id}
            className="flex items-center justify-between p-4 bg-white rounded shadow-md"
          >
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={selectedCandidates.includes(candidate.id)}
                onChange={() => toggleSelection(candidate.id)}
              />
              <div>
                <h4 className="font-bold">{candidate.name}</h4>
                <p className="text-gray-600">{candidate.position}</p>
                <p className="text-gray-600">
                  Experience: {candidate.experience} years
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
                onClick={handleScheduleInterview}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                <FaCalendarAlt className="inline mr-1" /> Schedule Interview
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bulk Actions */}
      {selectedCandidates.length > 0 && (
        <div className="mt-6 flex gap-4">
          <button
            onClick={handleBulkEmail}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Send Email to {selectedCandidates.length} Candidates
          </button>
          <button
            onClick={handleScheduleInterview}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Schedule Interviews for {selectedCandidates.length} Candidates
          </button>
        </div>
      )}

      {/* Candidate Details Modal */}
      {modalCandidate && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
            <h4 className="text-xl font-bold">{modalCandidate.name}</h4>
            <p>Position: {modalCandidate.position}</p>
            <p>Experience: {modalCandidate.experience} years</p>
            <p className="text-green-600 font-semibold">
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
    </div>
  );
};

export default ShortlistCandidates;
