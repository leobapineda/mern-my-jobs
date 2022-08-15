import React from "react";

function Alert({ text, type }) {
  console.log("Alert component");
  return <div className={`alert alert-${type}`}>{text}</div>;
}

export default Alert;
