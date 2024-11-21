import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Employee_Sidebar from "./Component/Employee_Sidebar";
import Employee_Profile from "./Component/Employee_Profile";
import Theme from "../../Components/Theme";
import heroImg from "../../assets/Images/Employee Dashboard/Hero.jpg";
import Employee_saved_jobs from "./Component/Employee_saved_jobs";
import Employee_Applied_Jobs from "./Component/Employee_Applied_Jobs";
import Employee_Messages from "./Component/Employee_Messages";
import Employee_change_password from "./Component/Employee_change_password";
import Employee_delete_account from "./Component/Employee_delete_account";
import Employee_logout from "./Component/Employee_logout";
import Employee_Suggested_Jobs from "./Component/Employee_Suggested_Jobs";

const Employee_Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <>
      <Theme pageName="Profile" heroImage={heroImg} />
      <div className="flex flex-col justify-center gap-8 md:flex-row my-16">
        <div className="md:w-[28rem]">
          {/* SideBar */}
          <Employee_Sidebar />
        </div>

        <div className="md:w-[50rem]">
          {/* MY PROFILE */}
          {tab === "profile" && <Employee_Profile />}

          {/* APPLIED JOBS */}
          {tab === "appliedjobs" && <Employee_Applied_Jobs />}

          {/* SUGGESTED JOBS */}
          {tab === "suggestedjobs" && <Employee_Suggested_Jobs />}

          {/* MESSAGES */}
          {tab === "messages" && <Employee_Messages />}

          {/* SAVED JOBS */}
          {tab === "saved-jobs" && <Employee_saved_jobs />}

          {/* CHANGE PASSWORD */}
          {tab === "change-password" && <Employee_change_password />}

          {/* DELETE ACCOUNT */}
          {tab === "delete-account" && <Employee_delete_account />}

          {/* LOGOUT ACCOUNT */}
          {tab === "logout" && <Employee_logout />}
        </div>
      </div>
    </>
  );
};

export default Employee_Dashboard;
