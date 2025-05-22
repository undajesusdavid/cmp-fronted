import React from "react";
import styles from "./SubPaginaReportes.module.css";

// Importa el servicio de reportes de bienes
import {
  reportesDisponiblesBienes,
  generarReporteBienes,
} from "../../services/bienes/reportesBienesService";

// Importar iconos de react-icons/fa (Font Awesome)
// Asegúrate de importar TODOS los iconos que hayas definido en reportesBienesService.js
import {
  FaBuilding,
  FaSitemap,
  FaTags,
  FaTools,
  FaHeartbeat,
  FaCalendarAlt,
  FaListAlt, // <-- ¡Este es el nuevo icono para el reporte general!
  // Agrega aquí cualquier otro icono que uses para bienes
} from "react-icons/fa";

// Mapea los nombres de cadena de los iconos a los componentes de React
const IconComponents = {
  FaBuilding: FaBuilding,
  FaSitemap: FaSitemap,
  FaTags: FaTags,
  FaTools: FaTools,
  FaHeartbeat: FaHeartbeat,
  FaCalendarAlt: FaCalendarAlt,
  FaListAlt: FaListAlt, // <-- Mapea el nuevo icono
  // Agrega aquí cualquier otro icono que uses
};

const SubPaginaReportes = () => {
  const handleGenerateReportClick = (reportId) => {
    generarReporteBienes(reportId); // Llama a la función del servicio de bienes
  };

  return (
    <div className={styles.reportsContainer}>
      <h2>📦 Reportes de Bienes</h2>
      <p>
        Explora y genera diversos reportes detallados sobre el inventario de
        bienes de la institución.
      </p>

      <div className={styles.reportCardsGrid}>
        {reportesDisponiblesBienes.map((report) => {
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
