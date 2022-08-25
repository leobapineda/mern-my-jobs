import React from "react";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import {NavLinks} from "../components"
function SmallSidebar() {
  const { showSidebar, toogleSidebar } = useGlobalContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toogleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          {/* <div className="nav-links">
            {links.map((link) => {
              const { id, text, icon, path } = link;
              return (
                <NavLink
                  key={id}
                  to={path}
                  onClick={toogleSidebar}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  <span className="icon">{icon}</span>
                  {text}
                </NavLink>
              );
            })}
          </div> */}
          <NavLinks toogleSidebar={toogleSidebar} />
        </div>
      </div>
    </Wrapper>
  );
}

export default SmallSidebar;
