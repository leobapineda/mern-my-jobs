import React, { useEffect, useRef } from "react";

function FormRow({ type, name, value, handleChange, labelText, isMember, NotuseFocusComponent }) {
  const nameInput = useRef();
  
  useEffect(() => {
    if (NotuseFocusComponent) return; 
      if (name === "name") {
        nameInput.current.focus();
        return;
      } else if (name === "email") {
        nameInput.current.focus();
        return;
      }
  }, [isMember]);

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        ref={nameInput}
        type={type}
        value={value}
        className="form-input"
        onChange={handleChange}
        id={name}
        name={name}
        required = {true}
      />
    </div>
  );
}

export default FormRow;
