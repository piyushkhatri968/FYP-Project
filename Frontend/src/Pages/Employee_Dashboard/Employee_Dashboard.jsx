import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Employee_Sidebar from "./Component/Employee_Sidebar";
import Employee_Profile from "./Component/Employee_Profile/Employee_Profile";
import Employee_saved_jobs from "./Component/Employee_saved_jobs";
import Employee_Applied_Jobs from "./Component/Employee_Applied_Jobs";
import Employee_Messages from "./Component/Employee_Messages";
import Employee_change_password from "./Component/Employee_change_password";
import Employee_delete_account from "./Component/Employee_delete_account";
import Employee_logout from "./Component/Employee_logout";
import Employee_Suggested_Jobs from "./Component/Employee_Suggested_Jobs";
import Employee_DetailDash from "./Component/Employee_DetailDash";
import Employee_Application from "./Component/Employee_Application";
import Account_Setting from "./Component/Account_Setting";

const Employee_Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search || location.pathname]);
  return (
    <>
      <div className="flex flex-col justify-center items-center md:items-start gap-8 md:flex-row my-16 md:mt-8">
        <div className="w-full max-w-96">
          {/* SideBar */}
          <Employee_Sidebar />
        </div>

        <div className="w-full">
          {/* MY PROFILE */}
          {tab === "dashboard" && <Employee_DetailDash />}

          {/* MY PROFILE */}
          {tab === "profile" && <Employee_Profile />}

          {/* SUGGESTED JOBS */}
          {tab === "suggestedjobs" && <Employee_Suggested_Jobs />}

          {/* APPLIED JOBS */}
          {tab === "appliedjobs" && <Employee_Applied_Jobs />}

          {/* APPLICATION TRACKING */}
          {tab === "trackapplication" && <Employee_Application />}

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

          {/* ACCOUNT SETTING */}
          {tab === "account-settings" && <Account_Setting />}
        </div>
      </div>
    </>
  );
};

export default Employee_Dashboard;
