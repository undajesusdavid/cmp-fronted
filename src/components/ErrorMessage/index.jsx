import React, { useState } from "react";
import { MdErrorOutline } from "react-icons/md"; // Ícono de error elegante
import PropTypes from "prop-types";

const defaultError = {
  message: "Sin Conexion",
  status: "500",
};

const ErrorMessage = ({ message, error = defaultError }) => {
  return (
    <div style={styles.container}>
      <MdErrorOutline style={styles.icon} />
      <span style={styles.text}>{error.message}</span>
    </div>
  );

};

ErrorMessage.propTypes = {
  message: PropTypes.string,
  error: PropTypes.object,
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fdecea",
    color: "#611a15",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #f5c6cb",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    maxWidth: "100%",
    margin: "10px 0px 30px 0px",
  },
  icon: {
    fontSize: "24px",
    marginRight: "10px",
  },
  text: {
    fontSize: "16px",
  },
};

export default ErrorMessage;
