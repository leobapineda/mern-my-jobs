import React from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
function Alert() {

  const { alertText, alertType } =
    useGlobalContext()


  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
}

export default Alert;
