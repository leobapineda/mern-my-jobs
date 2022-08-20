import React, { useEffect } from "react";
import { Link } from "react-router-dom";
function Dashboard() {
  return (
    <div>
      <h1>Dashboard </h1>
      <Link to="./landing">Landing</Link>
    </div>
  );
}

export default Dashboard;
