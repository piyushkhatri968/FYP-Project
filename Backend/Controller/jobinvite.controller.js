
import JobInvite from "../Models/Hr_Models/JobInvite.model.js";


export const inviteCandidateToJob = async (req, res) => {
  const { candidateId, jobId, recruiterId, message } = req.body;

  try {
    const alreadyInvited = await JobInvite.findOne({ candidate: candidateId, job: jobId });

    if (alreadyInvited) {
      return res.status(400).json({ message: "Candidate already invited to this job." });
    }

    const invite = new JobInvite({
      candidate: candidateId,
      job: jobId,
      recruiter: recruiterId,
      message,
    });

    await invite.save();

    res.status(201).json({ message: "Candidate invited successfully!", invite });
  } catch (err) {
    res.status(500).json({ message: "Error sending invite", error: err });
  }
};





