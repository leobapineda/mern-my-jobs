import React from "react";
import { Link, Outlet } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";
function SharedLayout() {
  return (
    <Wrapper>
      <nav>
        <Link to="all-jobs">alljobs </Link>
        <Link to="add-job">addjob </Link>
        <Link to="profile">profile </Link>
      </nav>
      <Outlet />
    </Wrapper>
  );
}

export default SharedLayout;
