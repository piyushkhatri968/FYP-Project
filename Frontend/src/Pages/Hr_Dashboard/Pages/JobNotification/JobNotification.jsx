import React, { useState ,useEffect} from "react";
import { FaPlus, FaSpinner } from "react-icons/fa";
import NotificationService from "./NotificationService";
import SkillInput from "./SkillInput";
import ExperienceInput from "./ExperienceInput";
import JobTypeSelector from "./JobTypeSelector";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MatchedCandidates from "../job/MatchedCandidates";
const JobNotification = ({ addRecentJob }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  
  // console.log("Current User from Redux:", currentUser); //debuging
  const [jobDetails, setJobDetails] = useState({
    title: "",
    department: "",
    location: "",
    description: "",
    experience: "",
    skills: [],
    jobType: "",
    postedBy: currentUser?._id || "", // Set postedBy with the user ID from Redux state
  });

  console.log(currentUser._id);

  const navigate = useNavigate();
  const [matchedCandidates, setMatchedCandidates] = useState([]);

  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log("Updated Matched Candidates State:", matchedCandidates);
  }, [matchedCandidates]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillAdd = (skill) => {
    if (!jobDetails.skills.includes(skill)) {
      setJobDetails((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
    }
  };

  const handleSkillRemove = (skill) => {
    setJobDetails((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  // const handleSubmit = async (e) => {

  //   e.preventDefault();
  //   setIsSending(true);
  //   setSuccessMessage("");
  //   setErrorMessage("");






  //   try {
  //     // Send job details to the backend
  //     const response = await NotificationService.sendNotifications(jobDetails);

  //     // Check if response.success exists
  //     if (response && response.success) {
  //       setSuccessMessage("Job posted successfully!");
  //       addRecentJob(jobDetails); // Update User Dashboard
  //       navigate("/hr/dashboard"); // Redirect to dashboard after successful post
  //     } 
  //     else {
  //       setErrorMessage("Failed to post the job. Please try again.");
  //     }
  //   } 
  //   // catch (error) {
  //   //   setErrorMessage("An error occurred. Please try again.");
  //   // } 
  //   finally {
  //     setIsSending(false);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setSuccessMessage("");
    setErrorMessage("");
  
    try {
      // Send job details to the backend
      const response = await NotificationService.sendNotifications(jobDetails);
  
      // Check if response.success exists
      if (response && response.success) {
        setSuccessMessage("Job posted successfully!");
        // addRecentJob(jobDetails); // Update User Dashboard
  
        // === Match candidates after job post ===
        const recruiterInput = {
          position: jobDetails.title,
          experience: jobDetails.experience,
          skills: jobDetails.skills,
          location: { city: jobDetails.location }, // Make sure this matches Flask logic
        };

        // console.log("hr input",recruiterInput)
  
        try {
          const matchRes = await fetch("http://localhost:5000/recruiter-search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ recruiter_input: recruiterInput }),
          });
  
          const matchData = await matchRes.json();
          if (matchData.matched_candidates && matchData.matched_candidates.length > 0) {
          

            setMatchedCandidates(matchData.matched_candidates);
          
          
            // TODO: Save to Redux or Context or navigate to /matched-candidates page
          } else {
            setMatchedCandidates([]);
        
        }
        navigate("/hr/matched-candidates", {
          state: { matchedCandidates: matchData.matched_candidates },
        });


        } catch (matchErr) {
          console.error("Error fetching matched candidates:", matchErr);
  setErrorMessage("Error matching candidates. Please try again.");
      
        }
  
       
        
      } else {
        
        setErrorMessage("Failed to post the job. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      console.error("Job post error:", error);
    } finally {
      setIsSending(false);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block font-medium text-gray-700">
            Job Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={jobDetails.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="department"
            className="block font-medium text-gray-700"
          >
            Department
          </label>
          <input
            type="text"
            name="department"
            id="department"
            value={jobDetails.department}
            onChange={handleChange}
            // required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="location" className="block font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={jobDetails.location}
            onChange={handleChange}
            // required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block font-medium text-gray-700"
          >
            Job Description
          </label>
          <textarea
            name="description"
            id="description"
            value={jobDetails.description}
            onChange={handleChange}
            // required
            rows="5"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <ExperienceInput
          value={jobDetails.experience}
          onChange={(value) =>
            setJobDetails((prev) => ({ ...prev, experience: value }))
          }
        />

        <JobTypeSelector
          value={jobDetails.jobType}
          onChange={(value) =>
            setJobDetails((prev) => ({ ...prev, jobType: value }))
          }
        />

        <SkillInput
          skills={jobDetails.skills}
          onAdd={handleSkillAdd}
          onRemove={handleSkillRemove}
        />

        {successMessage && (
          <p className="text-green-500 font-medium">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 font-medium">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={isSending}
          className={`w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
            isSending ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSending ? (
            <FaSpinner className="animate-spin inline-block mr-2" />
          ) : (
            <FaPlus />
          )}
          Post Job
        </button>
      </form>
   


    </div>
  );
};

export default JobNotification;
