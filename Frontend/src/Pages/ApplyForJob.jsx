import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const ApplyForJob = () => {
  const { id } = useParams();
  const getJob = async () => {
    const jobs = await axios.get(
      `http://localhost:8080/api/jobs/getJobDetails/${id}`,
      {
        withCredentials: true,
      }
    );
    console.log(jobs);
  };

  useEffect(() => {
    getJob();
  }, [id]);
  return <div>{id}</div>;
};

export default ApplyForJob;
