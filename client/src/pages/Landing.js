import React from "react";
import main from "../assets/images/main.svg";
import Wrapper  from "../assets/wrappers/LandingPage";
import {Logo} from '../components'

function Landing() {
  return (
    <Wrapper>
      <nav>
       <Logo />
      </nav>
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
          <button className="btn btn-hero">Login/Register</button>
        </div>
        <img className="img main-img" src={main} alt="main" />
      </div>
    </Wrapper>
  );
}


export default Landing;
