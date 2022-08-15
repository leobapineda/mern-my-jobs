import React, { useState, useRef, useEffect } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo } from "../components";
const initState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

function Register() {
  const [values, SetValues] = useState(initState);

  function handleChange(e) {
    console.log(e.target);
  }

  function onSubmit(e) {
    e.preventDefault();
    console.log(e.target);
  }

  return (
    <Wrapper className="full-page">
      <form onSubmit={onSubmit} className="form">
        <Logo/>
        <h3>Login</h3>
        {/* name input */}
        <div className="form-row">
          <label htmlFor="name" className="form-label">name</label>
          <input 
          type="text"
          value={values.name}
           className="form-input" 
           onChange={handleChange}
           />
        </div>
        <button className="btn btn-block">Submit</button>
      </form>
    </Wrapper>
  );
}

export default Register;
