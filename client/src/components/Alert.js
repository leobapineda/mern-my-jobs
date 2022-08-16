import React from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
function Alert() {
  // console.log("Alert component");

  const { alertText, alertType } =
    useGlobalContext()


  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
}

export default Alert;
