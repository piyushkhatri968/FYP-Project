import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Components/Sidebar";
import AllEmployees from "./Components/AllEmployees";
import AllRecruiters from "./Components/AllRecruiters";
import AdminDash from "./Components/AdminDash";
import AllAdmin from "./Components/AllAdmin";
import AddNewAdmin from "./Components/AddNewAdmin";
import { useSelector } from "react-redux";

const Admin_Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [tab, setTab] = useState("");

  const [totalUsers, setTotalUsers] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [loggedInLoading, setLoggedInLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const getTotalUsers = async () => {
    try {
      setUserLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/admin/getUsers`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setTotalUsers(response.data.users);
        setUserLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getLoggedInUsers = async () => {
    try {
      setLoggedInLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/auth/getMe/${currentUser._id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setUserData(response.data.user);
        setLoggedInLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoggedInLoading(false);
    }
  };
  const getAllJobs = async () => {
    try {
      setJobsLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/admin/allJobs`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setJobs(response.data.allJobs);
        setJobsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setJobsLoading(false);
    }
  };
  useEffect(() => {
    getTotalUsers();
    getLoggedInUsers();
    getAllJobs();
  }, []);
  return (
    <div className="mt-[70px] lg:mt-[0px]">
      {userLoading || loggedInLoading || jobsLoading ? (
        <div className="flex justify-center items-center w-full h-[200px]">
          <div className="w-6 h-6 border-4 border-[#00806E] border-dotted rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-2 min-h-screen text-white mx-4">
          <div className="lg:w-[400px]">
            <Sidebar userData={userData} />
          </div>
          {tab === "adminDash" && (
            <AdminDash
              totalUsers={totalUsers}
              setTotalUsers={setTotalUsers}
              jobs={jobs}
            />
          )}
          {tab === "allEmployees" && (
            <AllEmployees
              totalUsers={totalUsers}
              setTotalUsers={setTotalUsers}
            />
          )}
          {tab === "allRecruiter" && (
            <AllRecruiters
              totalUsers={totalUsers}
              setTotalUsers={setTotalUsers}
            />
          )}
          {tab === "alladmins" && (
            <AllAdmin totalUsers={totalUsers} setTotalUsers={setTotalUsers} />
          )}
          {tab === "addNewAdmin" && (
            <AddNewAdmin getTotalUsers={getTotalUsers} />
          )}
        </div>
      )}
    </div>
  );
};

export default Admin_Dashboard;
