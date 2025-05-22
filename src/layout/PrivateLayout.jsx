// src/layout/PrivateLayout.jsx

import React from "react";
import { Outlet } from "react-router-dom"; // Outlet renderiza el componente hijo de la ruta
import Sidebar from "./Sidebar"; // Tu Sidebar ya existente
import styles from "./PrivateLayout.module.css"; // Crearás este archivo CSS

const PrivateLayout = () => {
  return (
    <div className={styles.privateLayoutContainer}>
      <Sidebar />
      <main className={styles.mainContentArea}>
        <Outlet />{" "}
        {/* Aquí se renderizará el contenido de la página privada actual (Dashboard, Bienes, etc.) */}
      </main>
    </div>
  );
};

export default PrivateLayout;
