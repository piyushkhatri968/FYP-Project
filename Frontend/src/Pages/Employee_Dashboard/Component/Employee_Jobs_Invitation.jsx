import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBookmark, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import moment from "moment";
import { Spinner } from "flowbite-react";
import { useSelector } from "react-redux";
import companyImage from "../../../assets/Images/Jobs/CompanyImg.png";
import { Link } from "react-router-dom";
import { CiClock1, CiFilter, CiLocationOn } from "react-icons/ci";

const Employee_Jobs_Invitation = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [jobInvitations, setJobInvitations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch jobs and favorites when component loads
  useEffect(() => {
    const getJobsInvitation = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8080/api/hr/invitedJobs/${currentUser.candidateDetails}`
        );
        if (response.status === 200) {
          setJobInvitations(response.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    getJobsInvitation();
  }, [currentUser.candidateDetails]);

  // Handle applying for a job
  const handleApply = async (jobId) => {
    try {
      const userId = currentUser.candidateDetails;
      const response = await axios.post(
        "http://localhost:8080/api/application/candidate/applyJob",
        {
          userId,
          jobId,
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert("Failed to apply for the job.");
    }
  };

  return (
    <div className="p-6 min-h-screen shadow-2xl rounded-2xl">
      <h1 className="text-2xl font-bold mb-6">Jobs Invitaions by Recruiter</h1>
      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner size="xl" color="warning" />
          </div>
        ) : jobInvitations && jobInvitations.length > 0 ? (
          jobInvitations.map((job, index) => (
            <Link
              to={`/jobs/${job?.job?._id}`}
              key={index}
              className="flex items-center justify-between bg-[#FDE7E7] p-6 gap-6 md:gap-0 flex-col md:flex-row hover:rounded-md transition-all duration-200 hover:scale-[1.01]"
            >
              {/* Company Image */}
              <div className="md:w-[6rem] md:h-[5rem] w-full h-[3.8rem] bg-white flex items-center justify-center rounded-md border border-dashed border-gray-300">
                <img
                  src={companyImage}
                  alt="Company Logo"
                  className="w-10 h-10"
                  draggable="false"
                />
              </div>

              {/* Job Details */}
              <div className="flex flex-col justify-center items-center md:justify-normal md:items-start md:flex-1 pl-8 gap-1">
                <h2 className="text-lg font-bold">{job?.job?.title}</h2>
                <p className="text-sm">
                  Via{" "}
                  <span className="text-red-500">
                    {job?.recruiter?.companyName}
                  </span>
                </p>
                <div className="text-gray-500 flex items-center space-x-1 mt-1">
                  <CiLocationOn className="text-gray-600 text-lg" />
                  <span>{job?.job?.location}</span>
                </div>
                <div className="text-gray-500 flex items-center space-x-1">
                  <CiFilter className="text-gray-600 text-lg" />
                  <span>{job?.job?.skills.join(", ")}</span>
                </div>
              </div>

              {/* Right Side */}
              <div className="flex flex-col justify-center items-center gap-2 md:gap-4">
                <div className="text-red-600 bg-white py-2 px-8 border rounded-xl text-sm">
                  {job?.job?.jobType}
                </div>
                <div className="flex justify-center items-center gap-2 text-gray-500">
                  <CiClock1 />
                  <span>{moment(job?.job?.createdAt).fromNow()}</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center text-gray-600 mt-10">
            <p className="text-lg font-semibold">
              No jobs invitation available at the moment.
            </p>
            <p>Please check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employee_Jobs_Invitation;
