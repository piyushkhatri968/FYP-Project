import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SubscribeBox from "../../Components/SubscribeBox ";
import Employee_Sidebar from "./Component/Employee_Sidebar";
import Employee_Profile from "./Component/Employee_Profile";

const Employee_Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
    console.log(tab);
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* SideBar */}
        <Employee_Sidebar />
      </div>
      {tab === "profile" && <Employee_Profile />}
    </div>
  );
};

export default Employee_Dashboard;
