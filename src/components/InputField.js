import React from "react";
import "../styles/global.css";

function InputField({ label, name, value, onChange, placeholder }) {
  return (
    <div>
      <label>{label}</label>
      <input type="text" name={name} value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
}

export default InputField;