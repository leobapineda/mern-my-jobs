import React, { useState, useRef, useEffect } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo, FormRow } from "../components";
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
    SetValues((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    console.log(e.target);
  }

  return (
    <Wrapper className="full-page">
      <form onSubmit={onSubmit} className="form">
        <Logo />
        <h3>Login</h3>
        {/* name input */}
        <FormRow
          type="name"
          name="name"
          value={values.name}
          handleChange={handleChange}
        />
        {/* email input */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        <button className="btn btn-block">Submit</button>
      </form>
    </Wrapper>
  );
}

// htmlFor,
// label,
// type,
// value,
// className,
// handleChange,
// required,

export default Register;
