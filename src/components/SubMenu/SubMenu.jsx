// src/components/SubMenu/SubMenu.jsx

import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./SubMenu.module.css";

/**
 * Componente de Submenú Horizontal Reutilizable.
 *
 * @param {object} props
 * @param {Array<Object>} props.items - Un array de objetos, donde cada objeto
 * representa una opción del menú y debe tener:
 * - {string} label: El texto a mostrar en el enlace.
 * - {string} path: La ruta a la que apunta el enlace (relativa al padre).
 * - {string} [icon]: (Opcional) Un carácter Unicode o una cadena para usar como icono.
 */
const SubMenu = ({ items }) => {
  return (
    <nav className={styles.subMenuContainer}>
      <ul className={styles.subMenuList}>
        {items.map((item) => (
          <li key={item.path} className={styles.subMenuItem}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? `${styles.subMenuLink} ${styles.activeSubMenuLink}`
                  : styles.subMenuLink
              }
              end={item.end} // Usa 'end' para que coincida exactamente con la ruta base si es necesario
            >
              {item.icon && (
                <span className={styles.subMenuIcon}>{item.icon}</span>
              )}
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SubMenu;
