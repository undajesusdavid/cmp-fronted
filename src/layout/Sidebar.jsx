// src/layout/Sidebar.jsx

import React from "react";
import styles from "./Sidebar.module.css";
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import UserProfileCard from "./UserProfileCard/UserProfileCard";
import defaultUserImage from "../assets/default_employee.jpg"

// Importa los íconos de React Icons
import {
  FiHome, // Para Dashboard o Inicio
  FiArchive, // Para Archivo Central
  FiBriefcase, // Para Bienes (o FiGrid, FiBox)
  FiUsers, // Para Empleados
  FiUser, // Para Usuarios
  FiLogOut, // Para Cerrar Sesión
} from "react-icons/fi"; // Puedes cambiar a 'hi2' si prefieres Heroicons

// Define a default image URL if user.profilePicture is not available


const Sidebar = () => {
  const { logout, user } = useAuth();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h3 className={styles.sidebarTitle}>CMP</h3>
        <UserProfileCard
          imageUrl={user?.profilePicture || defaultUserImage} // Use user's image or default
          name={user.username}
          className={styles.userProfileCard}
        />
      </div>

      <nav className={styles.sidebarNav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.activeLink}`
                  : styles.navLink
              }
            >
              <FiHome className={styles.navIcon} /> Dashboard
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/archivo-central"
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.activeLink}`
                  : styles.navLink
              }
            >
              <FiArchive className={styles.navIcon} /> Archivo Central
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/bienes"
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.activeLink}`
                  : styles.navLink
              }
            >
              <FiBriefcase className={styles.navIcon} /> Bienes
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/empleados"
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.activeLink}`
                  : styles.navLink
              }
            >
              <FiUsers className={styles.navIcon} /> Empleados
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/usuarios"
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.activeLink}`
                  : styles.navLink
              }
            >
              <FiUser className={styles.navIcon} /> Usuarios
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.logoutContainer}>
        <button onClick={logout} className={styles.logoutButton}>
          <FiLogOut className={styles.logoutIcon} /> Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
