import axios from "axios";

const NotificationService = {
  // send notifications after posting the job
  async sendNotifications(jobDetails) {
    try {
      console.log("Sending notifications for job:", jobDetails);

      // Make a POST request to the backend to create the job post
      const response = await axios.post(
        "http://localhost:8080/api/jobposts", // Your backend API endpoint
        jobDetails
      );

      // Handle the response from the backend
      if (response.data.success) {
        console.log("Job successfully posted and notifications sent");
        return { success: true };
      } else {
        console.error("Failed to send notifications");
        return { success: false };
      }
    } catch (error) {
      console.error("Error sending notifications:", error);
      return { success: false };
    }
  },
};

export default NotificationService;
