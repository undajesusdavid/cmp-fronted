import React from "react";
import styles from "./InputGroup.module.css";

const InputGroup = ({
  label,
  htmlFor,
  children,
  error,
  inputWidth,
  loading,
}) => (
  <div className={styles.inputGroup}>
    {label && (
      <label htmlFor={htmlFor} className={styles.label}>
        {label}
      </label>
    )}
    <div
      className={styles.inputWrapper}
      style={inputWidth ? { maxWidth: inputWidth, width: inputWidth } : {}}
    >
      {loading ? (
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
          <span>Cargando datos...</span>
        </div>
      ) : (
        children
      )}
    </div>
    {error && <span className={styles.error}>{error}</span>}
  </div>
);

export default InputGroup;
