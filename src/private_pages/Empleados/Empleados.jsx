// src/private_pages/Empleados/Empleados.jsx

import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import SubMenu from "../../components/SubMenu/SubMenu";
import styles from "./Empleados.module.css";
import { FaChartBar, FaUsers } from "react-icons/fa";

const Empleados = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define los enlaces para el sub-menú de Empleados
  const empleadosSubMenuLinks = [
    { path: "listado", label: "Listado", icon: <FaUsers /> }, // Ícono de usuarios
    { path: "reportes", label: "Reportes", icon: <FaChartBar /> }, // Ícono de gráfico de barras
  ];
 

  // Redirige a la subpágina por defecto si se accede a /usuarios directamente
  useEffect(() => {
    if (
      location.pathname === "/empleados" ||
      location.pathname === "/empleados/"
    ) {
      navigate("/empleados/listado", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <div className={styles.pageContent}>
      <h1>Gestión de Personal</h1>
      <p>
        Administra toda la información relacionada con los empleados de la
        institución.
      </p>

      {/* Renderiza el componente SubMenu con los enlaces definidos */}
      <SubMenu items={empleadosSubMenuLinks} />

      {/* Aquí se renderizarán las sub-páginas (Listado, Reportes, etc.) */}
      <div className={styles.subPageContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default Empleados;
