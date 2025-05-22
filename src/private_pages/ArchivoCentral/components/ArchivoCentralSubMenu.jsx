// src/private_pages/ArchivoCentral/components/ArchivoCentralSubMenu.jsx

import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./ArchivoCentralSubMenu.module.css";

const ArchivoCentralSubMenu = () => {
  return (
    <nav className={styles.subMenuContainer}>
      <ul className={styles.subMenuList}>
        <li className={styles.subMenuItem}>
          <NavLink
            to="/archivo-central/documentos"
            className={({ isActive }) =>
              isActive
                ? `${styles.subMenuLink} ${styles.activeSubMenuLink}`
                : styles.subMenuLink
            }
          >
            Documentos
          </NavLink>
        </li>
        <li className={styles.subMenuItem}>
          <NavLink
            to="/archivo-central/categorias"
            className={({ isActive }) =>
              isActive
                ? `${styles.subMenuLink} ${styles.activeSubMenuLink}`
                : styles.subMenuLink
            }
          >
            Categorías
          </NavLink>
        </li>
        <li className={styles.subMenuItem}>
          <NavLink
            to="/archivo-central/reportes"
            className={({ isActive }) =>
              isActive
                ? `${styles.subMenuLink} ${styles.activeSubMenuLink}`
                : styles.subMenuLink
            }
          >
            Reportes
          </NavLink>
        </li>
        {/* Ejemplo de opción con sub-submenú (requiere lógica JS adicional para mostrar/ocultar) */}
        {/* Para este ejemplo, solo el enlace principal */}
        <li className={styles.subMenuItem}>
          <NavLink
            to="/archivo-central/configuracion"
            className={({ isActive }) =>
              isActive
                ? `${styles.subMenuLink} ${styles.activeSubMenuLink}`
                : styles.subMenuLink
            }
          >
            Configuración
          </NavLink>
          {/* Aquí iría la lógica del sub-submenú si lo implementas */}
          {/* <ul className={styles.subSubMenu}>
            <li><NavLink to="/archivo-central/configuracion/permisos">Permisos</NavLink></li>
          </ul> */}
        </li>
      </ul>
    </nav>
  );
};

export default ArchivoCentralSubMenu;
