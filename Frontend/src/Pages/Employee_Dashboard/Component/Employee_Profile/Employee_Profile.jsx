import React, { useEffect, useState } from "react";
import Basic_Info from "./Components/Basic_Info";
import Address from "./Components/Address";
import Other_Info from "./Components/Other_Info";
import { useSelector } from "react-redux";
import axios from "axios";

const Employee_Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [currentUserData, setCurrentUserData] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await axios.get(
          `http://localhost:8080/api/candidate/userData/${currentUser._id}`
        );
        setCurrentUserData(userData.data.data);
        console.log(userData.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  return (
    <div className="mx-auto p-3 w-full text-gray-500 px-12 shadow-lg rounded-xl">
      {/* BASIC INFORMATION */}

      <Basic_Info userData={currentUserData} />

      <hr className="my-8" />

      {/* ADDRESS */}

      <Address />

      <hr className="my-8" />

      {/* OTHER INFORMATION */}

      <Other_Info />

      <hr className="my-8" />

      {/* SOCIAL LINKS */}
    </div>
  );
};

export default Employee_Profile;
