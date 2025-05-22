// src/private_pages/Dashboard.jsx

import React from "react";
// ¡Ya NO importamos Sidebar aquí!
import styles from "./Dashboard.module.css"; // Mantenemos el CSS de la página si tiene estilos específicos

const Dashboard = () => {
  return (
    <div className={styles.pageContent}>
      {" "}
      {/* Asegúrate de que tu CSS para .pageContent sea simple y solo afecte el contenido */}
      <h1>📊 Dashboard Principal</h1>
      <p>
        Bienvenido a tu panel de control. Aquí encontrarás un resumen de la
        actividad de tu empresa.
      </p>
    </div>
  );
};

export default Dashboard;
