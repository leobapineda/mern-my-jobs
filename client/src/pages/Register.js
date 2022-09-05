import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
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
  let navigate = useNavigate();
  const [values, SetValues] = useState(initState);
  // --->>> STATES

  // --->>> GLOBAL CONTEXT
  const { showAlert, isLoading, displayAlert, user, token, setUpUser } =
    useGlobalContext();
  // --->>> GLOBAL CONTEXT

  // --->>> HANDLE INPUTS FUNCTIONS
  function handleChange(e) {
    SetValues((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (showAlert) return;
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    // CHECK FOR LOGIN OR REGISTER
    const currentUser = { name, email, password };
    if (isMember) {
      setUpUser({
        currentUser,
        endPoint: "login",
        alertMessage: "Welcome! Redirecting...",
      });
    } else {
      setUpUser({
        currentUser,
        endPoint: "register",
        alertMessage: "Registered! Redirecting...",
      });
    }
  }

  function toggleMember(e) {
    SetValues((prevState) => {
      return { ...prevState, isMember: !prevState.isMember };
    });
  }
  // --->>> HANDLE INPUTS FUNCTIONS

  // --->>> USE-EFFECT
  useEffect(() => {
    if (user && token) {
      setTimeout(() => {
        navigate("/");
      }, 500);
      return;
    } else return;
  }, [user, navigate, token]);
  // --->>> USE-EFFECT
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

        <button
          disabled={isLoading || showAlert}
          type="submit"
          className="btn btn-block"
        >
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
