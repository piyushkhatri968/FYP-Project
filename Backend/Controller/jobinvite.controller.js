import Candidate from "../Models/candidate.model.js";
import JobInvite from "../Models/Hr_Models/JobInvite.model.js";
import JobPost from "../Models/Hr_Models/Jobs.model.js";
import User from "../Models/user.model.js";
import Recruiter from "../Models/recruiter.model.js";
import { generateJobInviteEmail } from "../utils/emailTemplate.js"
export const inviteCandidateToJob = async (req, res) => {
  const { candidateId, jobId, recruiterId, message } = req.body;
  try {
    const alreadyInvited = await JobInvite.findOne({
      candidate: candidateId,
      job: jobId,
    });

    if (alreadyInvited) {
      return res
        .status(400)
        .json({ message: "Candidate already invited to this job." });
    }

    const invite = new JobInvite({
      candidate: candidateId,
      job: jobId,
      recruiter: recruiterId,
      message,
    });

    await invite.save();

    // const candidate= await Candidate.findById(candidateId)

    // const job= await JobPost.findById(jobId)
    // const recruiter= await Recruiter.findById(recruiterId)


    // if (!candidate || !recruiter || !job) {
    //   return res.status(404).json({ message: "Invalid candidate, recruiter, or job." });
    // }

    // // generating Email:
    // const { subject, htmlMessage }=generateJobInviteEmail({


    // })

    res
      .status(201)
      .json({ message: "Candidate invited successfully!", invite });
  } catch (err) {
    res.status(500).json({ message: "Error sending invite", error: err });
  }
};

export const getInvitedJobs = async (req, res, next) => {
  const { candidateId } = req.params;
  try {
    const invites = await JobInvite.find({ candidate: candidateId })
      .populate("job")
      .populate("recruiter");
    res.status(200).json(invites);
  } catch (error) {
    next(error);
  }
};
