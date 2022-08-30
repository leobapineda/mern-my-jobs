import React, { useEffect } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import Loading from "./Loading";
import Job from "./Job";
import JobInfo from "./JobInfo";
import Wrapper from "../assets/wrappers/JobsContainer";

import { useNavigate } from "react-router";

function JobsContainer() {
  const { getJobs, jobs, isLoading, totalJobs, numOfPages, page } =
    useGlobalContext();
  let navigate = useNavigate();

  // USEEFFECT
  useEffect(() => {
    getJobs();
  }, []);

  // USEEFFECT
  // console.log("jobsContainer");

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{(jobs.length > 1 || jobs.length === 0) && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {jobs.length === 0 && (
        <button className="btn" onClick={() => navigate("/add-job")}>
          Add job
        </button>
      )}
    </Wrapper>
  );
}

export default JobsContainer;
