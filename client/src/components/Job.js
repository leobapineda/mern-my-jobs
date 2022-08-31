import React from "react";
import moment from "moment";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";

function Job({
  _id,
  company,
  position,
  status,
  jobLocation,
  jobType,
  createdAt,
}) {
  const { setEditJob, deleteJob } = useGlobalContext();

  async function editJob(id) {
    await setEditJob(id);
  }
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo
            icon={<FaCalendarAlt />}
            text={moment(createdAt).format("MMMM  Do, YYYY")}
          />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-job"
              className="btn edit-btn"
              onClick={() => editJob(_id)}
            >
              Edit
            </Link>
            <button
              onClick={() => deleteJob(_id)}
              type="button"
              className="btn delete-btn"
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
}

export default Job;
