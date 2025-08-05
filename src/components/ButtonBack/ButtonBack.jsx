import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ButtonBack.module.css";

const ButtonBack = ({ label = "Regresar", className = "", style = {} }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className={`${styles.buttonBack} ${className}`}
      style={style}
    >
      <svg
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          d="M13 16l-6-6 6-6"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </button>
  );
};

export default ButtonBack;
