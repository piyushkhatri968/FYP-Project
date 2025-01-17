import React from "react";

const Account_Setting = () => {
  return (
    <div className="p-6 min-h-screen shadow-2xl rounded-2xl">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
      <div>
        {/* Add your account settings form here */}
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="John Doe"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Account_Setting;
