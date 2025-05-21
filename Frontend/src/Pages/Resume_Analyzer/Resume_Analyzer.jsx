import React, { useState } from "react";
import { useSelector } from "react-redux";
import ResumeDataPopup from "./ResumeDataPopup";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Resume_Analyzer = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [error, setError] = useState(null);
  const [browseJobsPopup, setBrowseJobsPopup] = useState(false);

  const [resumeDataSavePopup, setResumeDataSavePopup] = useState(false);

  // Simulate processing steps with delays
  const simulateProcessing = async () => {
    const steps = [
      "Uploading resume...",
      "Extracting text content...",
      "Analyzing skills and experience...",
      "Evaluating strengths and areas for improvement...",
      "Generating recommendations...",
      "Finalizing report...",
    ];

    for (const step of steps) {
      setLoadingStep(step);
      await new Promise((resolve) =>
        setTimeout(resolve, 800 + Math.random() * 700)
      );
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.includes("pdf") && !file.name.endsWith(".docx")) {
      setError("Please upload a PDF or DOCX file");
      return;
    }

    setLoading(true);
    setError(null);
    setResumeData(null);

    try {
      // Start showing processing steps
      simulateProcessing();

      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch("http://localhost:5000/api/analyze-resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze resume");
      }

      const data = await response.json();
      setResumeData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingStep("");
    }
  };

  const handleSaveResumeData = () => {
    setResumeDataSavePopup(true);
  };

  return (
    <>
      <div className="w-full min-h-screen bg-gray-50 p-6 md:p-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Resume Analyzer
          </h1>

          {/* File Upload Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <label className="block text-lg font-medium text-gray-700 mb-4">
              Upload your resume
            </label>
            <div className="flex items-center gap-4">
              <label className="flex-1 cursor-pointer">
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    loading
                      ? "border-blue-300 bg-blue-50"
                      : "border-gray-300 hover:border-blue-500"
                  }`}
                >
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={loading}
                  />
                  <div className="flex flex-col items-center justify-center">
                    {loading ? (
                      <>
                        {/* Animated spinner */}
                        <div className="w-12 h-12 mb-4 relative">
                          <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
                          <div className="absolute inset-1 rounded-full border-4 border-blue-300 border-t-transparent animate-spin animation-delay-200"></div>
                        </div>
                        <p className="text-gray-600 font-medium">
                          {loadingStep}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          This may take a few moments...
                        </p>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-12 h-12 text-gray-400 mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="text-gray-600">
                          Drag & drop or click to browse
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          PDF or DOCX (Max 5MB)
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </label>
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          {/* Loading Animation (when processing) */}
          {loading && !resumeData && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 animate-pulse">
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>

                <div className="pt-4 space-y-3">
                  <div className="flex space-x-2">
                    <div className="h-3 bg-blue-200 rounded-full w-3/4"></div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="h-3 bg-blue-200 rounded-full w-2/3"></div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="h-3 bg-blue-200 rounded-full w-4/5"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Section */}
          {/* Results Section */}
          {resumeData && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden w-full">
              {/* Basic Info */}
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Basic Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">
                      {resumeData.basic_info.name || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">
                      {resumeData.basic_info.email || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">
                      {resumeData.basic_info.phone || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">
                      {resumeData.basic_info.location || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Professional Info */}
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Professional Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Position</p>
                    <p className="font-medium">
                      {resumeData.professional_info.position || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-medium">
                      {resumeData.professional_info.experience
                        ? `${resumeData.professional_info.experience} year${
                            resumeData.professional_info.experience !== "1"
                              ? "s"
                              : ""
                          }`
                        : "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Skills</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {resumeData.professional_info.skills?.map(
                        (skill, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                          >
                            {skill}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Evaluation */}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Resume Evaluation
                </h2>

                {/* Pros */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-green-600 mb-2">
                    Strengths
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {resumeData.evaluation.pros.map((pro, index) => (
                      <li key={index} className="text-gray-700">
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-orange-600 mb-2">
                    Areas for Improvement
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {resumeData.evaluation.cons.map((con, index) => (
                      <li key={index} className="text-gray-700">
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Suggestions */}
                <div>
                  <h3 className="text-lg font-medium text-blue-600 mb-2">
                    Recommendations
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {resumeData.evaluation.suggestions.map(
                      (suggestion, index) => (
                        <li key={index} className="text-gray-700">
                          {suggestion}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div
                  className="text-center text-white font-semibold bg-OrangeColor p-4 rounded-md cursor-pointer my-6"
                  onClick={handleSaveResumeData}
                >
                  Save Your Data?
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Add these styles for the animated spinner */}
        <style jsx>{`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          .animate-spin {
            animation: spin 1s linear infinite;
          }
          .animation-delay-200 {
            animation-delay: 0.2s;
          }
        `}</style>
      </div>
      {resumeDataSavePopup && (
        <ResumeDataPopup
          setResumeDataSavePopup={setResumeDataSavePopup}
          resumeData={resumeData}
          setBrowseJobsPopup={setBrowseJobsPopup}
        />
      )}
      {browseJobsPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-lg relative">
            <div
              className="absolute -top-4 -right-4 cursor-pointer"
              onClick={() => setBrowseJobsPopup(false)}
            >
              <IoCloseSharp className="text-4xl p-1 bg-black rounded-full text-white" />
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12">
              <div className="flex justify-center">
                <DotLottieReact
                  src="https://lottie.host/859de488-fe1f-4447-96fc-f587b3f0ffe5/54LXII68hX.lottie"
                  loop
                  autoplay
                  className="w-56 h-56 md:w-96 md:h-96"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-center mb-4">
                  Resume Uploaded Successfully!
                </h2>
                <p className="text-gray-600 text-center mb-6 max-w-72 md:max-w-96">
                  Your CV has been uploaded and all your details have been saved
                  automatically. Discover job recommendations tailored to your
                  profile — no manual entry needed!
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <button className="bg-[#FD1616] text-white px-4 py-2 rounded-lg shadow font-semibold hover:bg-blue-900 transition duration-200">
                <Link to="/dashboard/employee?tab=suggestedjobs">
                  Browse Jobs
                </Link>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Resume_Analyzer;
