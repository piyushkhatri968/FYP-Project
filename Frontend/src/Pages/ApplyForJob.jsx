import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import companyImage from "../assets/Images/Jobs/CompanyImg.png";
import moment from "moment";
import { FaLocationDot } from "react-icons/fa6";
import { CiClock1 } from "react-icons/ci";
import { useSelector } from "react-redux";

const ApplyForJob = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState(null);
  const getJob = async () => {
    try {
      setLoading(true);
      const jobs = await axios.get(
        `http://localhost:8080/api/jobs/getJobDetails/${id}`,
        {
          withCredentials: true,
        }
      );
      if (jobs.status === 200) {
        setJob(jobs.data.job);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getJob();
  }, [id]);

  // Handle applying for a job
  const handleApplyJob = async (jobId) => {
    if (!currentUser) {
      return alert("Login in first to apply for this job");
    }
    if (currentUser.userType === "Admin") {
      return alert("Admin can't apply for jobs.");
    }
    if (currentUser.userType === "recruiter") {
      return alert("HR can't apply for jobs.");
    }
    const userId = currentUser?.candidateDetails;
    try {
      await axios.post(
        "http://localhost:8080/api/application/candidate/applyJob",
        {
          userId,
          jobId,
        }
      );
      alert("Job application submitted successfully.");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="w-full flex items-center justify-center min-h-screen">
          <Spinner size="xl" />
        </div>
      ) : job ? (
        <div className="px-4 sm:px-8 md:px-20 flex items-start justify-between gap-20">
          {/* job details */}
          <div>
            <div className="flex items-center gap-6">
              {/* image, */}
              <div className="my-10 bg-gray-800 p-8 rounded-md">
                <img src={companyImage} alt="companyImage" />
              </div>
              {/* title,  location */}
              <div>
                <p className="font-bold text-2xl text-[#010C29]">{job.title}</p>
                <p className="flex items-center gap-2 text-lg">
                  <FaLocationDot />
                  <span>{job.location}</span>
                </p>
                <p className="flex items-center gap-2 text-lg">
                  <CiClock1 />
                  <span>{moment(job.createdAt).fromNow()}</span>
                </p>
              </div>
            </div>
            {/* Description */}
            <div>
              <h1 className="mb-4 font-bold text-2xl text-[#010C29]">
                Description
              </h1>
              <p className="text-gray-600 mb-6">{job.description}</p>
            </div>
            {/* Skills */}
            <div>
              <h1 className="mb-4 font-bold text-2xl text-[#010C29]">
                Skills Required
              </h1>
              <p className="text-gray-600 mb-6 flex gap-2">
                {job &&
                  job.skills.map((skill, index) => (
                    <div key={index} className="text-black font-medium bg-gray-200 px-2 rounded-md">{skill}</div>
                  ))}
              </p>
            </div>
            {/* Job Details */}
            <div>
              <h1 className="mb-4 font-bold text-2xl text-[#010C29]">
                Job Details
              </h1>
              <div className="grid grid-cols-2 content-center gap-x-20 gap-y-10">
                <p className="text-[#010C29] font-semibold text-[18px] border-b border-gray-600">
                  Comapany{" "}
                  <span className="text-gray-600">
                    {job.postedBy?.recruiterDetails?.companyName}
                  </span>
                </p>
                <p className="text-[#010C29] font-semibold text-[18px] border-b border-gray-600">
                  Experience{" "}
                  <span className="text-gray-600">{job?.experience} Years</span>
                </p>
                <p className="text-[#010C29] font-semibold text-[18px] border-b border-gray-600">
                  Location{" "}
                  <span className="text-gray-600">{job?.location}</span>
                </p>
                <p className="text-[#010C29] font-semibold text-[18px] border-b border-gray-600">
                  Job Type <span className="text-gray-600">{job?.jobType}</span>
                </p>
                <p className="text-[#010C29] font-semibold text-[18px] border-b border-gray-600">
                  Email{" "}
                  <span className="text-gray-600">{job?.postedBy?.email}</span>
                </p>
              </div>
            </div>
            {/* apply now */}
            <button
              onClick={() => handleApplyJob(job._id)}
              className="rounded-md px-6 py-4 bg-OrangeColor hover:bg-[#d63636] transition-all duration-200 text-white mt-10 mb-20"
            >
              Apply Now
            </button>
          </div>
          {/* posted by */}
          <div className="flex flex-col items-center gap-3 shadow-2xl mt-4 px-28 py-8 w-full text-center max-w-sm rounded-md">
            <h1 className="font-bold text-2xl text-[#010C29]">Posted By</h1>
            <img
              src={job?.postedBy?.profilePicture}
              alt=""
              className="h-28 w-28 rounded-full"
            />
            <p className="text-lg font-semibold">{job?.postedBy?.name}</p>
            <p className="text-xl text-gray-600">
              Recruiter at {job.postedBy?.recruiterDetails?.companyName}
            </p>
          </div>
        </div>
      ) : (
        <div className="my-20">JOB NOT FOUND</div>
      )}
    </div>
  );
};

export default ApplyForJob;
