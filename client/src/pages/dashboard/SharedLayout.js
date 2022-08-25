import React from "react";
import { Link, Outlet } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";
import { Navbar, BigSidebar, SmallSidebar } from "../../components";
function SharedLayout() {
  return (
    <Wrapper>
      <main className="dashboard">
        <BigSidebar />
        <SmallSidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet/>
          </div>
        </div>
      </main>
    </Wrapper>
  );
}
{
  /* <Link to="all-jobs">alljobs </Link>
        <Link to="add-job">addjob </Link>
        <Link to="profile">profile </Link> */
}
export default SharedLayout;
