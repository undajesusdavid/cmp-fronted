// src/layout/Sidebar.jsx

import React from "react";
import styles from "./Sidebar.module.css";
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom"; // Importa NavLink en lugar de Link

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h3 className={styles.sidebarTitle}>Tu Empresa</h3>{" "}
        {/* Título de la aplicación */}
      </div>

      <nav className={styles.sidebarNav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            {/* NavLink para Dashboard */}
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.activeLink}`
                  : styles.navLink
              }
            >
              <span className={styles.navIcon}>📊</span> Dashboard
            </NavLink>
          </li>
          <li className={styles.navItem}>
            {/* NavLink para Archivo Central */}
            <NavLink
              to="/archivo-central"
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.activeLink}`
                  : styles.navLink
              }
            >
              <span className={styles.navIcon}>📂</span> Archivo Central
            </NavLink>
          </li>
          <li className={styles.navItem}>
            {/* NavLink para Bienes */}
            <NavLink
              to="/bienes"
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.activeLink}`
                  : styles.navLink
              }
            >
              <span className={styles.navIcon}>🏠</span> Bienes
            </NavLink>
          </li>
          <li className={styles.navItem}>
            {/* NavLink para Empleados */}
            <NavLink
              to="/empleados"
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.activeLink}`
                  : styles.navLink
              }
            >
              <span className={styles.navIcon}>👥</span> Empleados
            </NavLink>
          </li>
          <li className={styles.navItem}>
            {/* NavLink para Usuarios */}
            <NavLink
              to="/usuarios"
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.activeLink}`
                  : styles.navLink
              }
            >
              <span className={styles.navIcon}>👤</span> Usuarios
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.logoutContainer}>
        <button onClick={logout} className={styles.logoutButton}>
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
