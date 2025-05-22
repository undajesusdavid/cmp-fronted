// src/private_pages/Usuarios/SubPaginaGestion.jsx
import React from "react";
import styles from "./SubPaginaGestion.module.css";

const SubPaginaGestion = () => {
  return (
    <div className={styles.subPageContent}>
      <h2>⚙️ Gestión de Usuarios</h2>
      <p>Aquí puedes crear, editar y eliminar usuarios del sistema.</p>
      <ul>
        <li>Lista de usuarios</li>
        <li>Formulario de creación</li>
        <li>Opciones de edición</li>
      </ul>
    </div>
  );
};

export default SubPaginaGestion;
