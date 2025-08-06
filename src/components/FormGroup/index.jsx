import React from "react";
import styles from "./FormGroup.module.css";

const FormGroup = ({ direction = "vertical", wrap = false, className = "", children, ...props }) => {
  const groupClass = [
    styles.formGroup,
    direction === "horizontal" ? styles.horizontal : styles.vertical,
    wrap && direction === "horizontal" ? styles.wrap : "",
    className
  ].join(" ").trim();

  return (
    <div className={groupClass} {...props}>
      {children}
    </div>
  );
};

export default FormGroup;
