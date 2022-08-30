import React, { useEffect, useState } from "react";
import { Alert, FormRow, FormSelect } from "../../components";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useNavigate } from "react-router";

function AddJob() {
  const {
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    statusOptions,
    jobTypeOptions,
    createJob,
    isEditing,
    status,
    isLoading,
    editJob,
    editJobId
  } = useGlobalContext();

  const initState = {
    company: position,
    position: company,
    jobLocation: jobLocation,
    status: status,
    jobType: jobType,
  };

  const [jobInfo, setJobInfo] = useState(initState);
  let navigate = useNavigate()
  //si se esta editando,
  // mi initState toma el valor de mi actual job

  async function handleSubmit(e) {
    console.log("handleSubmit");
    e.preventDefault();
    if (isLoading) return;
    const { company, position, jobLocation } = jobInfo;
    if (!company.trim() || !position.trim() || !jobLocation.trim()) {
      displayAlert();
      return;
    }

    if (isEditing) {
      await editJob({ ...jobInfo, editJobId });
      // setJobInfo(initState);
      // setTimeout(() => {
      //   // navigate("/all-jobs");
      // }, 1000);
      return;
    }
    // create job
    await createJob({ ...jobInfo });
    setJobInfo(initState);
  }

  function handleChange(e) {
    setJobInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  
  return (
    <Wrapper>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <h3>{isEditing ? " edit job" : "add job"}</h3>
        {showAlert && <Alert />}
        {/* POSITION */}
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={jobInfo.position}
            handleChange={(e) => handleChange(e)}
          />
          {/* POSITION */}
          {/* COMPANY */}
          <FormRow
            type="text"
            name="company"
            value={jobInfo.company}
            handleChange={(e) => handleChange(e)}
          />
          {/* COMPANY */}
          {/* LOCATION */}
          <FormRow
            type="text"
            name="jobLocation"
            labelText={"job location"}
            value={jobInfo.jobLocation}
            handleChange={(e) => handleChange(e)}
          />
          {/* LOCATION */}
          {/* JOB STATUS */}
          <FormSelect
            labelText={"status"}
            // value={jobInfo.status}
            value={jobInfo.status}
            name={"status"}
            options={statusOptions}
            handleChange={handleChange}
          />
          {/* JOB STATUS */}
          {/* JOB TYPE */}
          <FormSelect
            labelText={"job type"}
            value={jobInfo.jobType}
            name={"jobType"}
            options={jobTypeOptions}
            handleChange={handleChange}
          />
          {/* JOB TYPE */}
          <div className="btn-container">
            <button
              disabled={isLoading}
              className="btn btn-block submit-btn"
              type="submit"
            >
              {isEditing ? "save changes" : "submit"}
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={() => setJobInfo(initState)}
              type="reset"
            >
              {isEditing ? "cancel" : "reset"}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
}

export default AddJob;