// src/private_pages/Empleados/SubPaginaReportes.jsx

import React from "react";
import styles from "./SubPaginaReportes.module.css";

// Importa el servicio de reportes
import {
  reportesDisponibles,
  generarReporteEmpleados,
} from "../../services/reportesEmpleadosService";

// Importar iconos de react-icons/fa (Font Awesome)
// Asegúrate de importar TODOS los iconos que hayas definido en reportesEmpleadosService.js
import {
  FaUsers,
  FaChartLine,
  FaClipboardList,
  FaRulerCombined,
  FaIdCard,
  FaBuilding,
} from "react-icons/fa";

// Mapea los nombres de cadena de los iconos a los componentes de React
const IconComponents = {
  FaUsers: FaUsers,
  FaChartLine: FaChartLine,
  FaClipboardList: FaClipboardList,
  FaRulerCombined: FaRulerCombined,
  FaIdCard: FaIdCard,
  FaBuilding: FaBuilding,
  // Agrega aquí cualquier otro icono que uses
};

const SubPaginaReportes = () => {
  const handleGenerateReportClick = (reportId) => {
    generarReporteEmpleados(reportId); // Llama a la función del servicio
  };

  return (
    <div className={styles.reportsContainer}>
      <h2>📊 Reportes de Empleados</h2>
      <p>
        Explora y genera diversos reportes detallados sobre el personal de la
        institución.
      </p>

      <div className={styles.reportCardsGrid}>
        {reportesDisponibles.map((report) => {
          const IconComponent = IconComponents[report.icon]; // Obtiene el componente de icono
          return (
            <div
              key={report.id}
              className={styles.reportCard}
              onClick={() => handleGenerateReportClick(report.id)}
            >
              <div className={styles.reportCardIcon}>
                {IconComponent ? <IconComponent /> : null}{" "}
                {/* Renderiza el icono */}
              </div>
              <h3 className={styles.reportCardTitle}>{report.nombre}</h3>
              <p className={styles.reportCardDescription}>
                {report.descripcion}
              </p>
              <button className={styles.generateButton}>Generar Reporte</button>
            </div>
          );
        })}
      </div>

      <p className={styles.developmentNote}>
        Haz clic en cualquier tarjeta para simular la generación del reporte.
      </p>
    </div>
  );
};

export default SubPaginaReportes;
