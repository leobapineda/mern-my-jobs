import React, { useEffect } from "react";
import { Link } from "react-router-dom";
function Dashboard() {

  // useEffect(() => {
  //   async function getD() {
  //     try {
  //       const response = await fetch("/data.json");
  //       console.log(response);
  //       const data = await response.json();
  //       console.log(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getD();
  // }, []);

  return (
    <div>
      <h1>Dashboard </h1>
      <Link to="./landing">Landing</Link>
    </div>
  );
}

export default Dashboard;
