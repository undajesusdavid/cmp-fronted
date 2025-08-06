import React from "react";
import styles from "./DefaultButton.module.css";

const DefaultButton = ({ children, onClick, type = "button", disabled = false, className = "" }) => (
  <button
    type={type}
    className={`${styles.defaultButton} ${className}`.trim()}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default DefaultButton;
