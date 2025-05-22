// src/private_pages/Usuarios/Usuarios.jsx

import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import SubMenu from "../../components/SubMenu/SubMenu"; // Importa el componente SubMenu genérico
import styles from "./Usuarios.module.css"; // Mantenemos el CSS para los estilos de la página Usuarios

const Usuarios = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define las opciones específicas para el submenú de Usuarios
  const usuariosSubMenuItems = [
    { label: "Gestión", path: "gestion", icon: "⚙️" },
    { label: "Roles", path: "roles", icon: "🛡️" },
    { label: "Permisos", path: "permisos", icon: "🔑" },
    { label: "Auditoría", path: "auditoria", icon: " audit_log" }, // Otra opción de ejemplo
  ];

  // Redirige a la subpágina por defecto si se accede a /usuarios directamente
  useEffect(() => {
    if (
      location.pathname === "/usuarios" ||
      location.pathname === "/usuarios/"
    ) {
      navigate("/usuarios/gestion", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <div className={styles.pageContent}>
      <h1>👥 Administración de Usuarios</h1>
      <p>Controla el acceso y los permisos de los usuarios del sistema.</p>

      {/* Usamos el componente SubMenu genérico, pasándole las opciones específicas de Usuarios */}
      <SubMenu items={usuariosSubMenuItems} />

      {/* Área donde se renderizarán las sub-páginas (Gestión, Roles, Permisos) */}
      <div className={styles.subPageContentArea}>
        <Outlet />{" "}
        {/* Aquí se renderizará el contenido de la sub-página actual */}
      </div>
    </div>
  );
};

export default Usuarios;
