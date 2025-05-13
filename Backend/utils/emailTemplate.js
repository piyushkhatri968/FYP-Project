export const AppliedJobFormat = ({ userEmail, jobTitle, jobId }) => {
  const jobLink = `http://localhost:5173/jobs/${jobId}`;
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            background-color: #ffffff;
            margin: 20px auto;
            padding: 20px;
            max-width: 600px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #007bff;
            color: white;
            padding: 10px 20px;
            border-radius: 8px 8px 0 0;
            text-align: center;
          }
          .content {
            padding: 20px;
            color: #333;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
          }
          @media only screen and (max-width: 600px) {
            .container {
              margin: 10px;
              padding: 15px;
            }
            .button {
              width: 100%;
              text-align: center;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Job Application Received</h2>
          </div>
          <div class="content">
            <p><strong>${userEmail}</strong> has applied for the job: <strong>${jobTitle}</strong>.</p>
            <p>You can view the job details by clicking the button below:</p>
            <a href="${jobLink}" class="button">View Job</a>
          </div>
        </div>
      </body>
    </html>
    `;
};



export const generateStatusEmail = ({ name, status, reason, position,companyName,Hrposition}) => {
  // console.log("details:", "name",name,"status",status,"reason",reason)
  let subject = '';
  let message = '';

  if (status === 'Shortlisted') {
    subject = 'You Have Been Shortlisted – Thank You for Applying';
    message = `
      <p>Dear ${name},</p>
      <p>Thank you for applying for the position: ${position},at our company ${companyName}. We are pleased to inform you that your application has been <strong>shortlisted</strong>.</p>
      <p>Our team will contact you shortly with the details of the next steps, including interview scheduling.</p>
      <p>We appreciate your interest and look forward to speaking with you soon.</p>
      <p>Best regards,
      <br/>${Hrposition}
      <br/>${companyName}</p>
    `;
  } else if (status === 'Rejected') {
    subject = 'Thank You for Your Application';
    message = `
      <p>Dear ${name},</p>
      <p>Thank you for taking the time to apply for the position: ${position}, at our company ${companyName}.</p>
      <p>After careful consideration, we have decided not to move forward with your application at this time.</p>
      ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
      <p>We truly appreciate your interest and encourage you to apply for future opportunities that match your profile.</p>
      <p>Best wishes for your continued success.</p>
      <p>Warm regards, 
      <br/>${Hrposition}
      <br/>${companyName}</p>
    `;
  }

  return { subject, message };
};




export const generateJobInviteEmail = ({ candidateName, jobTitle, companyName, recruiterPosition ,message }) => {
  console.log("details:", "candidateName", candidateName, "jobTitle", jobTitle, "companyName", companyName, "recruiterPosition", recruiterPosition, "message", message);
  const subject = `You're Invited to Apply for ${jobTitle} at ${companyName}`;

  const htmlMessage = `
    <p>Dear ${candidateName},</p>
    
    <p>We hope this message finds you well.</p>

    <p>You have been invited to apply for the position of <strong>${jobTitle}</strong> at <strong>${companyName}</strong>.</p>

    ${message ? `<p>${message}</p>` : ''}

    <p>To view more details and apply, please check your Dashboard:</p>
   

    <p>If you have any questions, feel free to reply to this email.</p>

    <p>Best regards, <br/>${recruiterPosition} <br/>${companyName}</p>
  `;

  return { subject, message: htmlMessage };
};
