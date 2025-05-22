import React from "react";
import styles from "./MainContent.module.css";

// Eliminamos las props: { isSidebarOpen, toggleSidebar }
const MainContent = () => {
  return (
    <main className={styles.mainContent}>
      <h1>Contenido Principal</h1>
      <p>
        Este es el área principal donde se mostrará el contenido dinámico de tu
        aplicación.
      </p>
      <p>Puedes agregar más elementos aquí según sea necesario.</p>
      <div className={styles.card}>
        <h2>Tarjeta de Contenido</h2>
        <p>Un ejemplo de una tarjeta dentro del contenido principal.</p>
      </div>
    </main>
  );
};

export default MainContent;
