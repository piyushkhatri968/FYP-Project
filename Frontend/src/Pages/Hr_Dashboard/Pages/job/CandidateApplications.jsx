import React, { useState } from "react";
import { FaUser, FaSearch, FaFilter, FaCheck, FaEnvelope, FaClipboardList } from "react-icons/fa";

const CandidateApplications = ({ onViewProfile, onShortlist }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPosition, setFilterPosition] = useState("");
  const [filterExperience, setFilterExperience] = useState("");
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [modalCandidate, setModalCandidate] = useState(null);

  const candidates = [
    { id: 1, name: "Alice Johnson", position: "Frontend Developer", experience: 3, isShortlisted: true },
    { id: 2, name: "Bob Smith", position: "Backend Developer", experience: 1, isShortlisted: false },
    { id: 3, name: "Carol Danvers", position: "Data Scientist", experience: 0, isShortlisted: false },
    { id: 4, name: "David Brown", position: "Frontend Developer", experience: 2, isShortlisted: false },
  ];

  const positions = ["Frontend Developer", "Backend Developer", "Data Scientist"];
  const experienceCategories = [
    { label: "Fresh Graduates", value: 0 },
    { label: "1st Year", value: 1 },
    { label: "2nd Year", value: 2 },
    { label: "3rd Year", value: 3 },
    { label: "4+ Years", value: 4 },
  ];

  // Filter logic
  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterPosition === "" || candidate.position === filterPosition) &&
      (filterExperience === "" || candidate.experience === parseInt(filterExperience))
  );

  const toggleSelection = (id) => {
    setSelectedCandidates((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((cid) => cid !== id) : [...prevSelected, id]
    );
  };

  const handleBulkEmail = () => alert("Bulk email sent to selected candidates.");
  const handleBulkShortlist = () => alert("Selected candidates have been shortlisted.");

  const openModal = (candidate) => setModalCandidate(candidate);
  const closeModal = () => setModalCandidate(null);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h3 className="text-2xl font-bold mb-6">Candidate Profiles</h3>

      {/* Search and Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2 bg-white p-2 rounded shadow-md">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="outline-none"
          />
        </div>
        <div className="flex items-center gap-2 bg-white p-2 rounded shadow-md">
          <FaFilter className="text-gray-500" />
          <select value={filterPosition} onChange={(e) => setFilterPosition(e.target.value)} className="outline-none">
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
            {experienceCategories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
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
              <FaUser className="text-blue-500 text-2xl" />
              <div>
                <h4 className="font-bold">{candidate.name}</h4>
                <p className="text-gray-600">Position: {candidate.position}</p>
                <p className="text-gray-600">Experience: {candidate.experience} years</p>
                <p
                  className={`text-sm font-semibold ${
                    candidate.isShortlisted ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  <FaCheck className="inline mr-1" />
                  {candidate.isShortlisted ? "Shortlisted" : "Applied"}
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
                onClick={() => onShortlist(candidate)}
                className={`px-4 py-2 ${
                  candidate.isShortlisted
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
              >
                {candidate.isShortlisted ? "Shortlisted" : "Shortlist"}
              </button>
              <input
                type="checkbox"
                checked={selectedCandidates.includes(candidate.id)}
                onChange={() => toggleSelection(candidate.id)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
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
            <FaEnvelope className="inline mr-1" /> Bulk Email
          </button>
          <button
            onClick={handleBulkShortlist}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            <FaClipboardList className="inline mr-1" /> Bulk Shortlist
          </button>
        </div>
      )}

      {/* Profile Modal */}
      {modalCandidate && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
            <h4 className="text-xl font-bold">{modalCandidate.name}</h4>
            <p>Position: {modalCandidate.position}</p>
            <p>Experience: {modalCandidate.experience} years</p>
            <p className="text-green-600 font-semibold">Status: Shortlisted</p>
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

export default CandidateApplications;
