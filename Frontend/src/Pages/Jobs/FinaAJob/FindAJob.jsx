import React from "react";
import Theme from "../../../Components/Theme";
import findJob from "../../../assets/Images/find-job.jpg";
import JobSearch from "./Components/JobSearch";
import PopularJobCategory from "./Components/PopularJobCategory";
import InterestedJobs from "../../../Components/InterestedJobs";
import JobNotificationPanel from "../../../Components/SubscribeBox ";

const FindAJob = () => {
  return (
    <div>
      <Theme pageName="Find A Job" heroImage={findJob} />
      <JobSearch />
      <PopularJobCategory />
      <InterestedJobs />
      <JobNotificationPanel />
    </div>
  );
};

export default FindAJob;
