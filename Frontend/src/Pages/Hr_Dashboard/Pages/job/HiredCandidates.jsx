import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaFilter } from "react-icons/fa";
import { useSelector } from "react-redux";
import Loader from "../../Components/Loader";

const HiredCandidates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPosition, setFilterPosition] = useState("");
  const [filterExperience, setFilterExperience] = useState("");
  const [hiredCandidates, setHiredCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchHiredCandidates = async () => {
      try {
        setIsLoading(true);
        if (!user || !user._id) return;

        const response = await axios.get(
          `http://localhost:8080/api/application/candidate/hired_candidates?hrId=${user._id}`
        );
        setHiredCandidates(response.data);
      } catch (error) {
        console.error("Error fetching hired candidates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHiredCandidates();
  }, [user]);

  const experienceRanges = [
    { label: "Fresh Graduates", value: "0" },
    { label: "1-2 Years", value: "1" },
    { label: "3-4 Years", value: "3" },
    { label: "5+ Years", value: "5" },
  ];

  const filteredCandidates = hiredCandidates.filter((candidate) => {
    const { userId } = candidate;
    const name = userId?.userId?.name?.toLowerCase() || "";
    const position = userId?.position || "";
    const experienceStr = userId?.experience || "0";
    let exp = 0;

    if (experienceStr.includes("-")) {
      const [min] = experienceStr.split("-").map(Number);
      exp = min;
    } else {
      exp = Number(experienceStr);
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

  if (isLoading) return <Loader />;

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Hired Candidates</h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        {/* Search */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-full shadow w-full sm:w-80">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full outline-none text-sm"
          />
        </div>

        {/* Position Filter */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-full shadow w-full sm:w-64">
          <FaFilter className="text-gray-400" />
          <select
            value={filterPosition}
            onChange={(e) => setFilterPosition(e.target.value)}
            className="w-full outline-none bg-transparent text-sm"
          >
            <option value="">All Positions</option>
            {[...new Set(hiredCandidates.map((c) => c.userId?.position))].map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
        </div>

        {/* Experience Filter */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-full shadow w-full sm:w-64">
          <FaFilter className="text-gray-400" />
          <select
            value={filterExperience}
            onChange={(e) => setFilterExperience(e.target.value)}
            className="w-full outline-none bg-transparent text-sm"
          >
            <option value="">All Experiences</option>
            {experienceRanges.map((exp) => (
              <option key={exp.value} value={exp.value}>
                {exp.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Candidate Cards */}
      {filteredCandidates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate) => {
            const { userId } = candidate;
            const name = userId?.userId?.name || "Unknown";
            const position = userId?.position || "N/A";
            const experience = userId?.experience || "0";
            const image = userId?.userId?.profilePicture || "/default-avatar.png";

            return (
              <div
                key={candidate._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 flex flex-col items-center text-center"
              >
                <img
                  src={image}
                  alt={name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-blue-100 mb-3"
                />
                <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
                <p className="text-sm text-gray-600">Position: {position}</p>
                <p className="text-sm text-gray-600">Experience: {experience} years</p>
                <span className="mt-2 px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                   
                  Hired
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-20">
          <h4 className="text-lg font-semibold">No Hired Candidates Found</h4>
        </div>
      )}
    </div>
  );
};

export default HiredCandidates;
