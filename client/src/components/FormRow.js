import React, { useEffect, useRef } from "react";

function FormRow({ type, name, value, handleChange, labelText, isMember }) {
  const nameInput = useRef();

  useEffect(() => {
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
      />
    </div>
  );
}

export default FormRow;

// debo poner mi ref en input
// para ver si renderiza, debo ver si isMember es verdad o falso
