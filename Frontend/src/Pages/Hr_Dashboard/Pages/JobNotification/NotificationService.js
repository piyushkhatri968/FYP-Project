const NotificationService = {
    async sendNotifications(jobDetails) {
      try {
        // Simulate API call to send notifications
        console.log("Sending notifications for job:", jobDetails);
  
        // Mock response
        return new Promise((resolve) =>
          setTimeout(() => resolve({ success: true }), 2000)
        );
      } catch (error) {
        console.error("Error sending notifications:", error);
        return { success: false };
      }
    },
  };
  
  export default NotificationService;
  