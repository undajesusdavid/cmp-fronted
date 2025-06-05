// src/private_pages/Empleados/Empleados.jsx
import "../stylesPrivatePages.css";

import { Outlet } from "react-router-dom";
import SubMenu from "../../components/SubMenu/SubMenu";
import styles from "./Empleados.module.css";
import { FaChartBar, FaUsers } from "react-icons/fa";

const Empleados = () => {
  // Define los enlaces para el sub-menú de Empleados
  const empleadosSubMenuLinks = [
    { path: "listado", label: "Listado", icon: <FaUsers /> },
    { path: "reportes", label: "Reportes", icon: <FaChartBar /> }, // Ícono de gráfico de barras
  ];

  return (
    <div className="pageContent">
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
