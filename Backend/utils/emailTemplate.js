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
