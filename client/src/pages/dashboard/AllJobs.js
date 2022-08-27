import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../../hooks/useGlobalContext";

function AllJobs() {
  const { getJobs, jobs, totalJobs, numOfPages, page } = useGlobalContext();
  useEffect(() => {
    getJobs();
  }, []);

  console.log(jobs, totalJobs, numOfPages, page);

  return <div>all jobs</div>;
}

export default AllJobs;
