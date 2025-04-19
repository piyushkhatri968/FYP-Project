import Application from "../Models/application.model.js";
import { errorHandler } from "../utils/Error.js";
import Candidate from "../Models/candidate.model.js";
import JobPost from "../Models/Hr_Models/Jobs.model.js";
import Interview from "../Models/Hr_Models/interview.model.js";

export const getApplications = async (req, res, next) => {
  try {
    const { status, jobTitle, candidateName, hrId } = req.query; // HR ID from query params

    if (!hrId) {
      return res
        .status(400)
        .json({ success: false, message: "HR ID is required." });
    }

    // Find jobs posted by the HR (recruiter)
    const jobsPostedByHR = await JobPost.find({ postedBy: hrId }).select("_id");

    // Extract job IDs
    const jobIds = jobsPostedByHR.map((job) => job._id);

    if (jobIds.length === 0) {
      return res
        .status(200)
        .json({
          success: true,
          message: "No applications found for this HR.",
          data: [],
        });
    }

    
    const query = { jobId: { $in: jobIds } }; // Get applications for HR's jobs
    if (status) query.status = status;
    if (jobTitle) query["jobId.title"] = { $regex: jobTitle, $options: "i" };
    if (candidateName) {
      query["userId.userId.name"] = { $regex: candidateName, $options: "i" };
    }

    // Fetch applications with filters applied
    const applications = await Application.find(query)
      .populate({
        path: "userId",
        populate: {
          path: "userId",
          select: "name email position",
        },
      })
      .populate("jobId", "title postedBy"); // Populate job details

    res.status(200).json({
      success: true,
      message: "Filtered job applications retrieved successfully",
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};

// export const getApplications = async (req, res, next) => {
//   try {
//     const { status, jobTitle, candidateName } = req.query; // Get filters from query params

//     // Build dynamic query object
//     const query = {};
//     if (status) query.status = status; // Filter by application status
//     if (jobTitle) query["jobId.title"] = { $regex: jobTitle, $options: "i" }; // Case-insensitive title search
//     if (candidateName) {
//       query["userId.userId.name"] = { $regex: candidateName, $options: "i" }; // Search candidate name
//     }

//     // Fetch applications with filters applied
//     const applications = await Application.find(query)
//       .populate({
//         path: "userId",
//         populate: {
//           path: "userId",
//           select: "name email position",
//         },
//       })

//     res.status(200).json({
//       success: true,
//       message: "Filtered job applications retrieved successfully",
//       data: applications,
//     });
//   } catch (error) {
//     next(error); // Pass errors to middleware
//   }
// };

// getApplications: Application Tracking.

// export const getApp = async (req, res) => {
//   try {
//     const { hrId } = req.query; // Get HR ID from request query

//     if (!hrId) {
//       return res.status(400).json({ error: "HR ID is required" });
//     }

//     // Fetch applications assigned to the given HR ID
//     const applications = await Application.find({ hrId }).populate("userId jobId");

//     res.json(applications);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching applications" });
//   }
// };




export const getApp = async (req, res) => {
  try {
    const { hrId } = req.query; // Get HR's ID from request query

    if (!hrId) {
      return res.status(400).json({ error: "HR ID is required." });
    }

    // Fetch applications where the job is posted by this HR
    const applications = await Application.find()
      .populate({
        path: "jobId",
        select: "title department location postedBy",
      })
      .populate({
        path: "userId",
        select: "name experience email phone education skills",
      });

    // Filter applications where the job's postedBy field matches HR ID
    const filteredApplications = applications.filter(
      (app) => app.jobId?.postedBy.toString() === hrId
    );

    // Count applications based on status
    const applicationStats = {
      applied: filteredApplications.filter((app) => app.status === "Applied").length,
      shortlisted: filteredApplications.filter((app) => app.status === "Shortlisted").length,
      rejected: filteredApplications.filter((app) => app.status === "Rejected").length,
      hired: filteredApplications.filter((app) => app.status === "Hired").length,
      applications: filteredApplications, // Send filtered applications for frontend
    };

    res.status(200).json(applicationStats);
  } catch (error) {
    res.status(500).json({ error: "Error fetching applications" });
  }
};



// export const getApp = async (req, res) => {
//   try {
//     const applications = await Application.find();
//     res.json(applications);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching applications" });
//   }
// };

// UpdateStatus:
export const updateStatus = async (req, res, next) => {
  const { id } = req.params; // Application ID
  const { status, reason } = req.body; // New status and rejection reason

  // Validate status
  if (!["Applied", "Shortlisted", "Rejected"].includes(status)) {
    return res.status(400).json({ error: "Invalid status value." });
  }

  // Validate rejection reason if status is "Rejected"
  if (status === "Rejected" && !reason) {
    return res.status(400).json({ error: "Rejection reason is required." });
  }

  try {
    // Find the application and update its status and reason
    const updateData = { status };
    if (status === "Rejected") {
      updateData.rejectionReason = reason; // Save the rejection reason
    }

    const application = await Application.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!application) {
      return res.status(404).json({ error: "Application not found." });
    }

    res.status(200).json({
      message: `Application status updated to ${status}.`,
      application,
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({ error: "Internal server error." });
    next(error);
  }
};

export const applyJobApplication = async (req, res, next) => {
  const { userId, jobId } = req.body;

  try {
    if (!userId || !jobId) {
      return next(errorHandler(400, "User ID and Job ID are required."));
    }

    const job = await JobPost.findById(jobId);
    if (!job) {
      return next(errorHandler(404, "Job not found"));
    }

    const user = await Candidate.findById(userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    // Check for duplicate application
    const existingApplication = await Application.findOne({ userId, jobId });
    if (existingApplication) {
      return next(errorHandler(400, "You have already applied for this job"));
    }

    const applyJob = new Application({ userId, jobId });
    await applyJob.save();

    // Update Candidate's appliedJobs array
    await Candidate.findByIdAndUpdate(
      userId,
      { $addToSet: { appliedJobs: jobId } }, // Prevent duplicates
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Application Submitted",
      data: applyJob,
    });
  } catch (error) {
    next(error); // Pass errors to error-handling middleware
  }
};

export const getJobStatus = async (req, res, next) => {
  const { userId, jobId } = req.query;
  try {
    if (!userId || !jobId) {
      return res
        .status(400)
        .json({ error: "Both userId and jobId are required" });
    }
    const jobStatus = await Application.findOne({ userId, jobId });

    if (!jobStatus) {
      return res.status(404).json({ error: "Job status not found" });
    }

    res.status(200).json({
      success: true,
      message: "Job status retrieved successfully",
      data: jobStatus,
    });
  } catch (error) {
    next(error);
  }
};

// export const getShortlistedCandidates = async (req, res) => {
//   try {
//     const { hrId } = req.query; // Get HR's ID from the request query
//     console.log("HR ID:", hrId); // Log the hrId received

//     if (!hrId) {
//       return res.status(400).json({ message: "HR ID is required." });
//     }

//     // Fetch shortlisted applications filtered by the HR who posted the job
//     const shortlistedApplications = await Application.find({
//       status: "Shortlisted",
//       "jobId.postedBy": hrId, // Match the job's postedBy field with the HR's ID
//     })
//       .populate({
//         path: "userId", // Populate the Candidate details
//         select: "name experience email", // Only select required fields
//       })
//       .populate({
//         path: "jobId", // Populate job details
//         match: { postedBy: hrId }, // Ensure HR is the job poster
//         select: "title department location position",
//       });
//       // .populate("jobId", "position"); // Optionally, include job details

//     console.log("Shortlisted Applications:", shortlistedApplications); // Log the shortlisted candidates

//     res.status(200).json(shortlistedApplications);
//   } catch (error) {
//     console.error("Error fetching shortlisted candidates:", error);
//     res.status(500).json({ message: "Error fetching shortlisted candidates", error });
//   }
// };
// export const getShortlistedCandidates = async (req, res) => {
//   try {
//     const { hrId } = req.query; // Get HR's ID from the request query
//     console.log("HR ID:", hrId); // Log the HR ID received

//     if (!hrId) {
//       return res.status(400).json({ message: "HR ID is required." });
//     }

//     // Fetch shortlisted applications first
//     const shortlistedApplications = await Application.find({ status: "Shortlisted" })
//       .populate({
//         path: "jobId",
//         select: "title department location postedBy", // Select necessary job fields
//       })
//       .populate({
//         path: "userId", // Populate Candidate details
//         select: "name experience email phone education skills", // Select required fields
//       });

//     // Filter applications where the job is posted by the given HR
//     const filteredShortlisted = shortlistedApplications.filter(app =>
//       app.jobId?.postedBy.toString() === hrId
//     );

//     console.log("Filtered Shortlisted Applications:", filteredShortlisted); // Log the filtered results

//     res.status(200).json(filteredShortlisted);
//   } catch (error) {
//     console.error("Error fetching shortlisted candidates:", error);
//     res.status(500).json({ message: "Error fetching shortlisted candidates", error });
//   }
// };

// shortlist candidates.

export const getShortlistedCandidates = async (req, res) => {
  try {
    const { hrId } = req.query; // Get HR's ID

    if (!hrId) {
      return res.status(400).json({ message: "HR ID is required." });
    }
    const shortlistedApplications = await Application.find({
      status: "Shortlisted",
    })
      .populate({
        path: "userId", // First populate userId from the Application model

        populate: {
          path: "userId", // Then populate userId from the Candidate model
          select: "name experience email", // Fetching selected fields
        },
      })
      .populate("jobId", " postedBy"); // populates, include job details

    // Filter applications where the job is posted by the given HR
    const filteredShortlisted = shortlistedApplications.filter(
      (app) => app.jobId?.postedBy.toString() === hrId
    );

    res.status(200).json(filteredShortlisted);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching shortlisted candidates", error });
  }
};

export const updateShortListId = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      id,
      { isShortlisted: true },
      { new: true }
    );
    res.status(200).json(updatedCandidate);
  } catch (error) {
    res.status(500).json({ error: "Failed to update candidate" });
  }
};

// interviewScheduling and sending email:
export const interviewScheduling = async (req, res) => {
  try {
    const newInterview = new Interview(req.body);
    await newInterview.save();
    res.status(200).json({ message: "Interview scheduled successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error scheduling interview" });
  }
};

// get interviewScheduling :

export const getinterviewScheduling = async (req, res) => {
  try {
    const { hrId } = req.query; // Get HR ID from query params

    if (!hrId) {
      return res.status(400).json({ error: "HR ID is required." });
    }

    // Fetch interviews and populate user & job details
    const interviews = await Interview.find()

      .populate({
        path: "jobId",
        select: "postedBy",
      })
      .populate("userId", "name email") // Populate userId with name and email
      .exec();

    // Filter interviews that belong to jobs posted by this HR
    const filteredInterviews = interviews.filter(
      (interview) => interview.jobId?.postedBy.toString() === hrId
    );

    res.status(200).json(filteredInterviews);
  } catch (error) {
    console.error("Error fetching interviews:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// export const getinterviewScheduling = async (req, res) => {
//   try {
//     const interviews = await Interview.find()
//       .populate("userId", "name email") // Populate userId with name and email
//       .exec();

//     res.json(interviews);
//   } catch (error) {
//     console.error("Error fetching interviews:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// anlaytics



export const getAnalytics = async (req, res) => {
  try {
    const { hrId } = req.query; // Get HR's ID from request query

    if (!hrId) {
      return res.status(400).json({ error: "HR ID is required." });
    }

    // Find applications related to jobs posted by this HR
    const applications = await Application.find()
      .populate({
        path: "jobId",
        select: "postedBy",
      });

    // Filter applications that belong to jobs posted by this HR
    const filteredApplications = applications.filter(
      (app) => app.jobId?.postedBy.toString() === hrId
    );

    // Count applications based on status
    const applicationsReceived = filteredApplications.length;
    const shortlisted = filteredApplications.filter((app) => app.status === "Shortlisted").length;
    const hired = filteredApplications.filter((app) => app.status === "Hired").length;

    res.status(200).json({
      applicationsReceived,
      shortlisted,
      hired,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ message: "Error fetching analytics data." });
  }
};



// export const getAnalytics = async (req, res) => {
//   try {
//     const applicationsReceived = await Application.countDocuments();
//     const shortlisted = await Application.countDocuments({
//       status: "Shortlisted",
//     });
//     const hired = await Application.countDocuments({ status: "Hired" });

//     res.status(200).json({
//       applicationsReceived,
//       shortlisted,
//       hired,
//     });
//   } catch (error) {
//     console.error("Error fetching analytics:", error);
//     res.status(500).json({ message: "Error fetching analytics data." });
//   }
// };
