import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaCalendarAlt, FaFilter } from "react-icons/fa";
import InterviewScheduling from "./InterviewScheduling";
import Loader from "../../Components/Loader";
import { useSelector } from "react-redux";

const ShortlistCandidates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPosition, setFilterPosition] = useState("");
  const [filterExperience, setFilterExperience] = useState("");
  const [shortlistedCandidates, setShortlistedCandidates] = useState([]);
  const [modalCandidate, setModalCandidate] = useState(null);
  const [interviewCandidate, setInterviewCandidate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showInterviewModal, setShowInterviewModal] = useState(false);

  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchShortlistedCandidates = async () => {
      try {
        setIsLoading(true);
        if (!user || !user._id) return;

        const response = await axios.get(
          `http://localhost:8080/api/application/candidate/shortlisted-candidates?hrId=${user._id}`
        );
        setShortlistedCandidates(response.data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShortlistedCandidates();
  }, [user]);

  const experience = [
    { label: "Fresh Graduates", value: "0" },
    { label: "1-2 Years", value: "1" },
    { label: "3-4 Years", value: "3" },
    { label: "5+ Years", value: "5" },
  ];
  const filteredCandidates = shortlistedCandidates.filter((candidate) => {
    const { userId } = candidate;
    const name = userId?.userId?.name?.toLowerCase() || "";
    const position = userId?.position || "";
    const experienceStr = userId?.experience|| "0";
let exp = 0;

if (typeof experienceStr === "string" && experienceStr.includes("-")) {
  // Convert "2-3" into average, or pick min value
  const [min] = experienceStr.split("-").map(Number);
  exp = min; // or (min + max) / 2 if you want midpoint
} else {
  exp = Number(experienceStr); // Will safely convert "2" to 2
}

    return (
      name.includes(searchQuery.toLowerCase()) &&
      (filterPosition === "" || position === filterPosition) &&
      (filterExperience === "" ||
        (filterExperience === "0" && exp === 0) ||
        (filterExperience === "1" && exp >= 1 && exp <= 2) ||
        (filterExperience === "3" && exp >= 3 && exp <= 4) ||
        (filterExperience === "5" && exp >= 5))
    );
  });

  const handleScheduleInterview = (candidate) => {
    setInterviewCandidate(candidate);
    setShowInterviewModal(true);
  };
  const openModal = (candidate) => setModalCandidate(candidate);

 
  const closeModal = () => {
    setModalCandidate(null);
    setInterviewCandidate(null);
    setShowInterviewModal(false);
  };


const HandleRejectCandidate=async(candidate)=>{
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
  
        if(isLoading){
          return <Loader/>
        }
        // Show confirmation to the admin
        alert(
          `${candidate.userId?.name || "Candidate"} has been rejected with reason: "${rejectionReason}".`
        );

      
      } catch (error) {
        console.error("Failed to reject candidate:", error);
        alert("Failed to reject candidate.");
      }finally{
        setIsLoading(false)
      }

}


    const handleHireCandidate= async(candidate)=>{
          try {
            setIsLoading(true)
           
            const response = await axios.post(
              `http://localhost:8080/api/application/candidate/${candidate._id}/status`,
              { status: "Hired" }
            );

            if(isLoading){
              return <Loader/>
            }
            alert(`${candidate.userId.userId?.name || "Candidate"} has been Hired.`);
           
          } catch (error) {
            console.error("Error Hiring candidate:", error);
            alert("Failed to Hiring candidate.");
          }
          finally{
            setIsLoading(false)
          }


      
    }

    const handleHirelist = (candidate) => {
    if (candidate.status === "Hired") {
      alert(`${candidate.userId.userId?.name || "Candidate"} is already Hired.`);
      return;
    }
    handleHireCandidate(candidate); // Call the API function
  };
  if (isLoading) return <Loader />;

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h3 className="text-xl sm:text-2xl font-bold mb-6">Shortlisted Candidates</h3>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6">
        {/* Search */}
        <div className="flex items-center gap-2 bg-white p-2 rounded shadow w-full sm:w-auto">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search candidates"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="outline-none w-full sm:w-auto"
          />
        </div>

        {/* Filter by Position */}
        <div className="flex items-center gap-2 bg-white p-2 rounded shadow w-full sm:w-auto">
          <FaFilter className="text-gray-500" />
          <select
            value={filterPosition}
            onChange={(e) => setFilterPosition(e.target.value)}
            className="outline-none w-full"
          >
            <option value="">Filter by Position</option>
            {[...new Set(shortlistedCandidates.map((c) => c.userId?.position))].map(
              (position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              )
            )}
          </select>
        </div>

        {/* Filter by Experience */}
        <div className="flex items-center gap-2 bg-white p-2 rounded shadow w-full sm:w-auto">
          <FaFilter className="text-gray-500" />
          <select
            value={filterExperience}
            onChange={(e) => setFilterExperience(e.target.value)}
            className="outline-none w-full"
          >
            <option value="">Filter by Experience</option>
            {experience.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Candidate Cards */}
      {filteredCandidates.length > 0 ? (
        <div className="grid gap-4">
          {filteredCandidates.map((candidate) => {
            const { userId } = candidate;
            const name = userId?.userId?.name || "Unknown";
            const experience = userId?.experience || 0;
            const position = userId?.position || "N/A";
            const profileImage =
              userId?.userId?.profilePicture ;

            return (
              <div
                key={candidate._id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white rounded-xl shadow hover:shadow-lg transition duration-300"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={profileImage}
                    alt={`${name}'s profile`}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
                    <p className="text-sm text-gray-600">Position: {position}</p>
                    <p className="text-sm text-gray-600">Experience: {experience} years</p>
                  </div>
                </div>

                {/* <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
                  <button
                   onClick={() => openModal(candidate)}

                    className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition text-sm"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => handleScheduleInterview(candidate)}
                    className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition text-sm"
                  >
                    <FaCalendarAlt className="inline mr-1" /> Schedule Interview
                  </button>
                </div> */}



<div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
  <button
    onClick={() => openModal(candidate)}
    className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition text-sm w-full sm:w-auto"
  >
    View Profile
  </button>
  <button
    onClick={() => handleScheduleInterview(candidate)}
    className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition text-sm w-full sm:w-auto"
  >
    <FaCalendarAlt className="inline mr-1" /> Schedule Interview
  </button>
  <button
    onClick={() => handleHirelist(candidate)}
    className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition text-sm w-full sm:w-auto"
  >

    Hire
  </button>
  <button
    onClick={() => HandleRejectCandidate(candidate)}
    className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition text-sm w-full sm:w-auto"
  >
    Reject
  </button>
</div>



              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-gray-600 py-10">
          <p className="text-lg font-medium">No candidates found matching the current filters.</p>
          <p className="font-semibold mt-2">NOT FOUND</p>
        </div>
      )}

      {/* Profile Modal */}
      {modalCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow w-full max-w-md">
            <h4 className="text-xl font-bold mb-2">
              Name: {modalCandidate.userId?.userId?.name}
            </h4>
            <p><strong>Email:</strong> {modalCandidate.userId?.userId?.email}</p>
            <p><strong>Skills:</strong> {modalCandidate.userId?.skills?.join(" ") || "N/A"}</p>
            <p><strong>Phone:</strong> {modalCandidate.userId?.phone || "N/A"}</p>
            <p><strong>Position:</strong> {modalCandidate.userId?.position}</p>
            <p><strong>Experience:</strong> {modalCandidate.userId?.experience} years</p>
            <p><strong>Social Links:</strong> {modalCandidate.userId?.socialLinks || "N/A"}</p>
            <p className="text-green-600 font-semibold mt-4">Status: Shortlisted</p>
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
      {showInterviewModal && interviewCandidate && (
        <InterviewScheduling candidate={interviewCandidate} closeModal={closeModal} />
      )}
    </div>
  );
};

export default ShortlistCandidates;
