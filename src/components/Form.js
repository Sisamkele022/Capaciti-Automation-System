import React, { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import "../styles/global.css";

function Form({ onSubmit }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
      <InputField label="Name" name="name" onChange={handleChange} placeholder="Enter name" />
      <InputField label="Email" name="email" onChange={handleChange} placeholder="Enter email" />
      <Button text="Submit" onClick={() => onSubmit(formData)} />
    </form>
  );
}

export default Form;