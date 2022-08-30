import React from "react";
import moment from "moment";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useNavigate } from "react-router";

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
  let navigate = useNavigate();

  // al dar click en editar se me habre una nueva pagina en add job para editar, 
  //se debe modificar el estado global de isEditing y eso actualiza el Add job page
  // todos los recuadros se llenan con la info que pasamos de mi elemento
  async function editJob(id) {
      await setEditJob(id);
      navigate("/add-job");
  }
  return (
    <div>
      <h5>company: {company} - </h5>
      <span>position: {position} - </span>
      <span>status: {status} - </span>
      <span>jobLocation: {jobLocation} - </span>
      <span>jobType: {jobType}</span>
      <div>{moment(createdAt).format("MMMM  Do, YYYY")}</div>
      <button onClick={() => deleteJob(_id)}>remove</button>
      <button onClick={() => editJob(_id)}>edit</button>
    </div>
  );
}

export default Job;
