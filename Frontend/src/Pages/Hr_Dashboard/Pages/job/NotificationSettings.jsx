import React, { useState } from "react";

const NotificationSettings = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true,
  });
  const [error, setError] = useState("");

  const handleToggle = (type) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
    setError(""); // Clear error when toggling any option
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validation: At least one notification type must be enabled
    const isAnyEnabled =
      notificationSettings.emailAlerts ||
      notificationSettings.smsAlerts ||
      notificationSettings.pushNotifications;

    if (!isAnyEnabled) {
      setError("At least one notification type must be enabled.");
      return;
    }

    console.log("Updated Notification Settings:", notificationSettings);
    alert("Notification settings updated successfully!");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Notification Settings</h2>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* Email Alerts */}
        <div className="flex items-center justify-between">
          <label className="text-gray-700 font-medium">Email Alerts</label>
          <div className="relative">
            <input
              type="checkbox"
              checked={notificationSettings.emailAlerts}
              onChange={() => handleToggle("emailAlerts")}
              className="sr-only"
              id="email-alerts"
            />
            <label
              htmlFor="email-alerts"
              className={`block w-12 h-6 rounded-full cursor-pointer transition ${
                notificationSettings.emailAlerts
                  ? "bg-blue-500"
                  : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition ${
                  notificationSettings.emailAlerts ? "translate-x-6" : ""
                }`}
              ></span>
            </label>
          </div>
        </div>

        {/* SMS Alerts */}
        <div className="flex items-center justify-between">
          <label className="text-gray-700 font-medium">SMS Notifications</label>
          <div className="relative">
            <input
              type="checkbox"
              checked={notificationSettings.smsAlerts}
              onChange={() => handleToggle("smsAlerts")}
              className="sr-only"
              id="sms-alerts"
            />
            <label
              htmlFor="sms-alerts"
              className={`block w-12 h-6 rounded-full cursor-pointer transition ${
                notificationSettings.smsAlerts ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition ${
                  notificationSettings.smsAlerts ? "translate-x-6" : ""
                }`}
              ></span>
            </label>
          </div>
        </div>

        {/* Push Notifications */}
        <div className="flex items-center justify-between">
          <label className="text-gray-700 font-medium">Push Notifications</label>
          <div className="relative">
            <input
              type="checkbox"
              checked={notificationSettings.pushNotifications}
              onChange={() => handleToggle("pushNotifications")}
              className="sr-only"
              id="push-notifications"
            />
            <label
              htmlFor="push-notifications"
              className={`block w-12 h-6 rounded-full cursor-pointer transition ${
                notificationSettings.pushNotifications
                  ? "bg-blue-500"
                  : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition ${
                  notificationSettings.pushNotifications ? "translate-x-6" : ""
                }`}
              ></span>
            </label>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm font-medium">{error}</p>
        )}

        {/* Save Changes Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotificationSettings;
