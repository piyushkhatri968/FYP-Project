import React from "react";
import { useSelector } from "react-redux";
const Account_Setting = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-6 min-h-screen shadow-2xl rounded-2xl">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
      <div>
        {/* Add your account settings form here */}
        <form>
          <div className="w-full flex justify-center items-center flex-col">
            <img
              src={currentUser.profilePicture}
              className="w-32 h-32 rounded-full"
              alt=""
            />
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" placeholder={currentUser.name} />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="******" />
            </div>
          </div>
          <button>Edit</button>
        </form>
      </div>
    </div>
  );
};

export default Account_Setting;
