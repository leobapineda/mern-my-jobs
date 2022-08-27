import React from 'react'
// function FormRow({ type, name, value, handleChange, labelText, isMember, NotuseFocusComponent }) {

function FormSelect({ labelText, name, value, options, handleChange }) {
  return (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {labelText || name}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => handleChange(e)}
        className="form-select"
      >
        {options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}
export default FormSelect
