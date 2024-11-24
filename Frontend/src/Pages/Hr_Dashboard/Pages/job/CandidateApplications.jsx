import React, { useState } from "react";
import { FaUser, FaSearch, FaFilter, FaCheck, FaEnvelope, FaClipboardList, FaTimes } from "react-icons/fa";


const CandidateApplications = ({ onViewProfile, onShortlist, onReject }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPosition, setFilterPosition] = useState("");
  const [filterExperience, setFilterExperience] = useState("");
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [modalCandidate, setModalCandidate] = useState(null);

  const candidates = [
    {
      id: 1,
      name: "Babar Hanif",
      position: "Frontend Developer",
      experience: 3,
      status: "Applied",
      email: "babar@example.com",
      phone: "123-456-7890",
      skills: ["React", "JavaScript", "HTML", "CSS"],
      resumeUrl: "https://example.com/resume/babar",
    },
    {
      id: 2,
      name: "Jagdesh Kumar",
      position: "Backend Developer",
      experience: 1,
      status: "Applied",
      email: "jagdesh@example.com",
      phone: "987-654-3210",
      skills: ["Node.js", "Express", "MongoDB"],
      resumeUrl: "https://example.com/resume/jagdesh",
    },
    {
      id: 3,
      name: "Pawan Kumar",
      position: "Backend Developer",
      experience: 2,
      status: "Applied",
      email: "Pawan@example.com",
      phone: "987-6000-3210",
      skills: ["Node.js", "Express", "MongoDB", "Mysql", "React Js"],
      resumeUrl: "https://example.com/resume/Pawan",
    },
    {
      id: 4,
      name: "Mubarak Sharif",
      position: "Wordpress Developer",
      experience: 5,
      status: "Applied",
      email: "Sharif@example.com",
      phone: "006-234-3210",
      skills: ["Node.js", "Express", "MongoDB"],
      resumeUrl: "https://example.com/resume/Mubark",
    },
   
  ];
  

  const positions = ["Frontend Developer", "Backend Developer", "Data Scientist"];
  const experienceCategories = [
    { label: "Fresh Graduates", value: 0 },
    { label: "1 Year", value: 1 },
    { label: "2 Years", value: 2 },
    { label: "3 Years", value: 3 },
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
  // const handleRejectCandidate = (candidate) => {
  //   alert(`${candidate.name} has been rejected.`);
  //   // Notify the user about rejection (Backend integration)
  //   onReject(candidate.id);
  // };

  const handleRejectCandidate = (candidate) => {
    alert(`${candidate.name} has been rejected.`);
    candidate.status = "Rejected"; // Simulate status change locally
    onReject(candidate); // Notify backend for actual update
  };

  const openModal = (candidate) => setModalCandidate(candidate);
  const closeModal = () => setModalCandidate(null);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h3 className="text-2xl font-bold mb-6">Candidate Applications</h3>

      {/* Search and Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2 bg-white p-2 rounded shadow-md w-full sm:w-auto">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="outline-none w-full"
          />
        </div>
        <div className="flex items-center gap-2 bg-white p-2 rounded shadow-md w-full sm:w-auto">
          <FaFilter className="text-gray-500" />
          <select value={filterPosition} onChange={(e) => setFilterPosition(e.target.value)} className="outline-none w-full">
            <option value="">Filter by Position</option>
            {positions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2 bg-white p-2 rounded shadow-md w-full sm:w-auto">
          <FaFilter className="text-gray-500" />
          <select
            value={filterExperience}
            onChange={(e) => setFilterExperience(e.target.value)}
            className="outline-none w-full"
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
                    candidate.status === "Shortlisted" ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {candidate.status}
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
                  candidate.status === "Shortlisted"
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
              >
                {candidate.status === "Shortlisted" ? "Shortlisted" : "Shortlist"}
              </button>
              <button
                onClick={() => handleRejectCandidate(candidate)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Reject
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
      <h4 className="text-xl font-bold mb-4">{modalCandidate.name}</h4>
      <p><strong>Position:</strong> {modalCandidate.position}</p>
      <p><strong>Experience:</strong> {modalCandidate.experience} years</p>
      <p><strong>Email:</strong> {modalCandidate.email || "N/A"}</p>
      <p><strong>Phone:</strong> {modalCandidate.phone || "N/A"}</p>
      <p><strong>Skills:</strong> {modalCandidate.skills?.join(", ") || "N/A"}</p>
      <a
        href={modalCandidate.resumeUrl || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline mt-2 inline-block"
      >
        View Resume
      </a>
      <div className="mt-6">
        <button
          onClick={closeModal}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default CandidateApplications;
