import React, { useState, useRef, useEffect } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo, FormRow, Alert } from "../components";
import { useGlobalContext } from "../hooks/useGlobalContext";
const initState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

function Register() {
  // --->>> STATES
  const [values, SetValues] = useState(initState);

  // --->>> STATES

  // --->>> GLOBAL CONTEXT
  const { showAlert, isLoading, displayAlert } = useGlobalContext();
  // --->>> GLOBAL CONTEXT

  // --->>> HANDLE INPUTS FUNCTIONS
  function handleChange(e) {
    SetValues((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    if (showAlert) return;
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    console.log("register user");
    registerUser("/api/v1/auth/register", { name, email, password });
    // console.log("all good, login/register");
  }

  function toggleMember(e) {
    SetValues((prevState) => {
      return { ...prevState, isMember: !prevState.isMember };
    });
  }
  // --->>> INPUTS FUNCTIONS

  // --->>> API CALLS

// app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/jobs", AuthorizationMiddleware, jobsRouter);

  async function registerUser(url, data) {
    console.log(url);
    console.log(data);
      const reponse = await fetch(url, {
        method: "POST",
        body: data,
      });
      console.log(reponse);
  }
  
  // --->>> API CALLS

  // --->>> USE-EFFECT

  // --->>> USE-EFFECT
  // console.log("register");
  return (
    <Wrapper className="full-page">
      <form onSubmit={(e) => onSubmit(e)} className="form">
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {/* name input */}
        {showAlert && <Alert />}
        {!values.isMember && (
          <FormRow
            type="name"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        {/* email input */}
        <FormRow
          focusElement={true}
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
          isMember={values.isMember}
        />
        {/* password input */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        <button type="submit" className="btn btn-block">
          Submit
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : " Already a member?"}
          <button type="button" className="member-btn" onClick={toggleMember}>
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}
// values.isMember
export default Register;
