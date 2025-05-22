// src/private_pages/Bienes/Bienes.jsx

import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import SubMenu from "../../components/SubMenu/SubMenu"; // Importa el componente SubMenu genérico
import styles from "./Bienes.module.css"; // Mantenemos el CSS para los estilos de la página Bienes

const Bienes = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define las opciones específicas para el submenú de Bienes
  const bienesSubMenuItems = [
    { label: "Inventario", path: "inventario", icon: "📝" },
    { label: "Reportes", path: "reportes", icon: "📉" }
  ];

  // Redirige a la subpágina por defecto si se accede a /bienes directamente
  useEffect(() => {
    if (location.pathname === "/bienes" || location.pathname === "/bienes/") {
      navigate("/bienes/inventario", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <div className={styles.pageContent}>
      <h1>🏠 Gestión de Bienes</h1>
      <p>Administra los activos y propiedades de la empresa.</p>

      {/* Usamos el componente SubMenu genérico, pasándole las opciones específicas de Bienes */}
      <SubMenu items={bienesSubMenuItems} />

      {/* Área donde se renderizarán las sub-páginas (Inventario, Mantenimiento, Activos Fijos) */}
      <div className={styles.subPageContentArea}>
        <Outlet />{" "}
        {/* Aquí se renderizará el contenido de la sub-página actual */}
      </div>
    </div>
  );
};

export default Bienes;
