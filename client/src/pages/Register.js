import React, { useState, useRef, useEffect } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo, FormRow, Alert } from "../components";
import { useGlobalContext } from "../context";
const initState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
  showAlert : false
};

function Register() {
  // --->>> STATES
  const { show, setShow, hideAlert } = useGlobalContext();
  const [values, SetValues] = useState(initState);
  const [alertState, setAlertState] = useState({ text: "", type:""});
  // --->>> STATES

  // --->>> INPUTS FUNCTIONS
  function handleChange(e) {
    console.log(e.target);
    SetValues((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    if (values.name === "" || values.email === "" || values.password === "") {
      setShow(true);
      setAlertState({ text: "filled all inputs", type: "danger" });
      hideAlert()
      return;
    }
  }
  // --->>> INPUTS FUNCTIONS
  console.log("Register");
  return (
    <Wrapper className="full-page">
      <form onSubmit={onSubmit} className="form">
        <Logo />
        <h3>Login</h3>
        {/* name input */}
        {show && <Alert {...alertState} />}
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

export default Register;
