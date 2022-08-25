import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../../hooks/useGlobalContext";

function AllJobs() {
  // llamada api, obtener todos los trabajos aqui al venir al componente y mostrarlos
  const [jobs, setJobs] = useState([]);

  const { token } = useGlobalContext();
  useEffect(() => {
    async function getJobs() {
      const {
        data: { jobs },
      } = await axios.get("api/v1/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(jobs);
    }
    getJobs();
  }, []);

  console.log("render all jobs");

  return (
    <div>
      {jobs.map((job) => {
        const { title, status, _id } = job;
        return (
          <article key={_id}>
            <h1>{title}</h1>
            <div>{status}</div>
          </article>
        );
      })}
    </div>
  );
}

export default AllJobs;
