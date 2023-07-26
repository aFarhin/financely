import React from "react";
import "./styles.css";
const Input = ({ label, state, setState, placeholder, type }) => {
  return (
    <div className="input-wrapper test">
      <p className="label-input">{label}</p>
      <input
      type={type}
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={placeholder}
        className="custom-input"
      />
    </div>
  );
};

export default Input;
