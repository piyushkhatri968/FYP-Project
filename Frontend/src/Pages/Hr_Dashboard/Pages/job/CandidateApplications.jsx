import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // CurrentUser
import {
  FaUser,
  FaSearch,
  FaFilter,
  FaCheck,
  FaEnvelope,
  FaClipboardList,
  FaTimes,
} from "react-icons/fa";
import axios from "axios";
import Loader from "../../Components/Loader";

const CandidateApplications = ({ onViewProfile, onShortlist, onReject }) => {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPosition, setFilterPosition] = useState("");
  const [filterExperience, setFilterExperience] = useState("");
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [modalCandidate, setModalCandidate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const user = useSelector((state) => state.user.currentUser);

  const experienceCategories = [
    { label: "Fresh Graduates", value: 0 },
    { label: "1 Year", value: 1 },
    { label: "2 Years", value: 2 },
    { label: "3 Years", value: 3 },
    { label: "4+ Years", value: "4+" },
  ];

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setIsLoading(true);

        if (!user || !user._id) {
          setErrorMessage("HR ID is missing.");
          setIsLoading(false);
          return;
        }

        const hrId = user._id;

        // Fetch only candidates who applied for HR's jobs
        const response = await axios.get(
          `http://localhost:8080/api/application/candidate/get?hrId=${hrId}`
        );

        console.log("Response:", response);
        setCandidates(response.data.data || []);
        setFilteredCandidates(response.data.data || []);
      } catch (error) {
        console.error("Error fetching candidates:", error);
        setErrorMessage("Failed to load candidate data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidates();
  }, [user]);

  // Handle filtering based on search, position, and experience
  useEffect(() => {
    const applyFilters = () => {
      const filtered = candidates.filter(
        (candidate) =>
          (searchQuery === "" ||
            candidate.userId?.userId?.name
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase())) && // Apply search filter
          (filterPosition === "" ||
            candidate.userId?.position?.toLowerCase() ===
            filterPosition.toLowerCase()) && // Apply position filter
          (filterExperience === "" ||
            (filterExperience === "4+" ? parseInt(candidate.userId?.experience || 0) >= 4 : parseInt(candidate.userId?.experience || 0) === parseInt(filterExperience))
          )

      );
      setFilteredCandidates(filtered);
    };
    applyFilters();
  }, [searchQuery, filterPosition, filterExperience, candidates]);

  const toggleSelection = (id) => {
    setSelectedCandidates((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((cid) => cid !== id)
        : [...prevSelected, id]
    );
  };

  const handleBulkEmail = async () => {
    try {
      await axios.post("http://localhost:8080/api/candidates/bulk-email", {
        candidateIds: selectedCandidates,
      });
      alert("Bulk email sent successfully.");
    } catch (error) {
      alert("Failed to send bulk email.");
    }
  };

  const handleBulkShortlist = async () => {
    try {
      await axios.post("http://localhost:8080/api/candidates/bulk-shortlist", {
        candidateIds: selectedCandidates,
      });
      alert("Selected candidates have been shortlisted.");
      setSelectedCandidates([]);
    } catch (error) {
      alert("Failed to shortlist candidates.");
    }
  };

  const handleRejectCandidate = async (candidate) => {
    try {
      setIsLoading(true)
      // Prompt the user to enter a rejection reason
      const rejectionReason = prompt(
        `Please enter a reason for rejecting ${candidate.userId?.name || "the candidate"
        }:`
      );

      // If no reason is provided, cancel the rejection
      if (!rejectionReason) {
        alert("Rejection reason is required.");
        return;
      }

      // Send the rejection reason along with the status to the server
      await axios.post(
        `http://localhost:8080/api/application/candidate/${candidate._id}/status`,
        { status: "Rejected", reason: rejectionReason }
      );
     if (isLoading) {
    return <Loader />
  }
      // Show confirmation to the admin
      alert(
        `${candidate.userId?.name || "Candidate"} has been rejected with reason: "${rejectionReason}".`
      );

      // Remove the rejected candidate from the frontend list
      setCandidates((prev) => prev.filter((c) => c._id !== candidate._id));
      setFilteredCandidates((prev) =>
        prev.filter((c) => c._id !== candidate._id)
      );
    } catch (error) {
      console.error("Failed to reject candidate:", error);
      alert("Failed to reject candidate.");
    } finally{
      setIsLoading(false)

    }
  };





  const handleShortlistCandidate = async (candidate) => {
    try {
        
      const response = await axios.post(
        `http://localhost:8080/api/application/candidate/${candidate._id}/status`,
        { status: "Shortlisted" }
      );
   
    
      alert(`${candidate.userId.userId?.name || "Candidate"} has been shortlisted.`);
      setCandidates((prev) =>
        prev.map((c) =>
          c._id === candidate._id ? { ...c, status: "Shortlisted" } : c
        )
      );
    } catch (error) {
      console.error("Error shortlisting candidate:", error);
      alert("Failed to shortlist candidate.");
    }
   
  };


  const handleShortlist = (candidate) => {
    if (candidate.status === "Shortlisted") {
      alert(`${candidate.userId.userId?.name || "Candidate"} is already shortlisted.`);
      return;
    }
    handleShortlistCandidate(candidate); // Call the API function
  };

  const openModal = (candidate) => setModalCandidate(candidate);
  const closeModal = () => setModalCandidate(null);
  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h3 className="text-xl sm:text-2xl font-bold mb-6"> Applied Candidates</h3>



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
          <select
            value={filterPosition}
            onChange={(e) => setFilterPosition(e.target.value)}
            className="outline-none w-full"
          >



            <option value="">Filter by Position</option>
            {[...new Set(filteredCandidates.map((c) => c.userId?.position).filter(Boolean))].map(
              (position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              )
            )}
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
      {isLoading ? (
        <p>Loading candidates...</p>
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : filteredCandidates.length === 0 ? (
        <p>No candidates match the criteria.</p>
      ) : (
        <div className="space-y-4">
          {filteredCandidates.map((candidate) => (
            <div
              key={candidate._id}
              className="p-4 bg-white rounded shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    candidate.userId.userId?.profilePicture ||
                    "https://via.placeholder.com/40"
                  }
                  alt="User Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold">
                    {candidate.userId.userId?.name || "N/A"}
                  </h4>
                  <p className="text-gray-600">
                    Position: {candidate.userId.position}
                  </p>
                  <p className="text-gray-600">
                    Experience: {candidate.userId.experience} years
                  </p>
                  <p
                    className={`text-sm font-semibold ${candidate.status === "Shortlisted"
                        ? "text-green-600"
                        : "text-gray-500"
                      }`}
                  >
                    {candidate.status}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="overflow-x-auto">
                <div className="flex items-center gap-2 w-max">
                  <button
                    onClick={() => openModal(candidate)}
                    className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 whitespace-nowrap"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => handleShortlist(candidate)}
                    disabled={candidate.status === "Shortlisted"}
                    className={`px-3 py-2 rounded whitespace-nowrap ${candidate.status === "Shortlisted"
                        ? "bg-green-500 text-white cursor-not-allowed"
                        : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                      }`}
                  >
                    {candidate.status === "Shortlisted" ? "Shortlisted" : "Shortlist"}
                  </button>
                  <button
                    onClick={() => handleRejectCandidate(candidate)}
                    className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 whitespace-nowrap"
                  >
                    Reject
                  </button>
 
                </div>
              </div>

            </div>



          ))}
        </div>
      )}

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-center">
            <h4 className="text-xl font-bold mb-4">{modalCandidate.userId.userId?.name}</h4>

            <p>
              <strong>Position:</strong>{" "}
              {modalCandidate.userId?.position || "N/A"}
            </p>
            <p>
              <strong>Experience:</strong>{" "}
              {modalCandidate.userId?.experience || "N/A"} years
            </p>
            <p>
              <strong>Email:</strong> {modalCandidate.userId.userId?.email || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong> {modalCandidate.userId?.phone || "N/A"}
            </p>
            <p>
              <strong>Skills:</strong>{" "}
              {modalCandidate.userId?.skills?.join(", ") || "N/A"}
            </p>

            <a
              href={modalCandidate.userId.resume || "#"}
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