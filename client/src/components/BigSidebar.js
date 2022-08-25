import React from "react";
import Wrapper from "../assets/wrappers/BigSidebar";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { NavLinks } from "../components";
import Logo from "../components/Logo";
function BigSidebar() {
  const { showSidebar } = useGlobalContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"}
      >
        <div className="nav-links">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
}

export default BigSidebar;
