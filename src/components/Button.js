import React from "react";
import "../styles/global.css";

function Button({ text, onClick }) {
  return <button onClick={onClick}>{text}</button>;
}

export default Button;