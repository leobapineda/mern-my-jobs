import React from "react";
import main from "../assets/images/main.svg";
import Wrapper  from "../assets/wrappers/LandingPage";
import { Link } from "react-router-dom";
function Landing() {
  return (
    <Wrapper>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam
            dignissimos id, eaque modi qui possimus neque, itaque voluptatibus
            tempora sequi nulla expedita quam vel mollitia rerum suscipit eos
            hic quibusdam!
          </p>
            <Link className="btn btn-hero" to="/register">
              Login/Register
            </Link>
        </div>
        <img className="img main-img" src={main} alt="main" />
      </div>
    </Wrapper>
  );
}


export default Landing;
