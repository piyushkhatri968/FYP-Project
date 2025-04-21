import React, { useEffect, useState } from "react";
import Basic_Info from "./Components/Basic_Info";
import Address from "./Components/Address";
import Other_Info from "./Components/Other_Info";
import { useSelector } from "react-redux";
import axios from "axios";
import Social_Links from "./Components/Social_Links";
import { Spinner } from "flowbite-react";
import UpdateResume from "./Components/UpdateResume";

const Employee_Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [currentUserData, setCurrentUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    const getUserData = async () => {
      setLoading(true);
      try {
        const userData = await axios.get(
          `http://localhost:8080/api/candidate/getData/${currentUser.candidateDetails}`
        );
        setCurrentUserData(userData.data.data);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getUserData();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner size="xl" color="warning" />
        </div>
      ) : (
        <div className="mx-auto p-3 w-full text-gray-500 px-12 shadow-lg rounded-xl">
          {/* BASIC INFORMATION */}

          <Basic_Info userData={currentUserData} />

          <hr className="my-8" />

          {/* Resume update */}

          <UpdateResume />
          <hr className="my-8" />

          {/* ADDRESS */}

          <Address userData={currentUserData} />

          <hr className="my-8" />

          {/* OTHER INFORMATION */}

          <Other_Info userData={currentUserData} />

          <hr className="my-8" />

          {/* SOCIAL LINKS */}

          <Social_Links />
        </div>
      )}
    </div>
  );
};

export default Employee_Profile;
