import React from "react";
import "./Input.scss";

const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <div className="Input">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
