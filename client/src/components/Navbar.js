import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useGlobalContext } from "../hooks/useGlobalContext";
import Logo from "./Logo";
import { Link } from "react-router-dom";
function Navbar() {
  const { logoutUser, toogleSidebar, user } = useGlobalContext();
  const [showLogout, setShowLogout] = useState(false);

  function handleLogout() {
     logoutUser();
  }
  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={toogleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Link to="/all-jobs">
            <Logo />
          </Link>

          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            className="btn"
            onClick={() => setShowLogout((prev) => !prev)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button onClick={() => handleLogout()} className="dropdown-btn">
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
// <Logo/>
//     <h4>DashBoard</h4>
//     <button> <FaUserCircle/> Leo</button>
export default Navbar;
