// src/servicios/bienes/reportesBienesService.js

// Importamos los datos simulados
import bienesSimulados from "../../data/inventarioBienesData";

// Importamos todos los reportes específicos
import { generarReporteGeneral } from "./reportes/reporteGeneralBienes";
import { generarReportePorSede } from "./reportes/reporteBienesPorSede";
import { generarReportePorUnidadAdministrativa } from "./reportes/reporteBienesPorUnidadAdministrativa";
import { generarReportePorCategoria } from "./reportes/reporteBienesPorCategoria";
import { generarReportePorEstadoUso } from "./reportes/reporteBienesPorEstadoUso";
import { generarReportePorCondicionFisica } from "./reportes/reporteBienesPorCondicionFisica";
import { generarReporteAdquiridosPorFecha } from "./reportes/reporteBienesAdquiridosPorFecha";

// Definimos los reportes disponibles para bienes
export const reportesDisponiblesBienes = [
  {
    id: "bienes_general",
    nombre: "Listado General de Bienes",
    descripcion: "Genera un reporte con todos los bienes registrados.",
    icon: "FaListAlt",
  },
  {
    id: "bienes_por_sede",
    nombre: "Bienes por Sede",
    descripcion:
      "Genera un listado de bienes agrupados por su sede de ubicación.",
    icon: "FaBuilding",
  },
  {
    id: "bienes_por_unidad_administrativa",
    nombre: "Bienes por Unidad Administrativa",
    descripcion:
      "Reporte de bienes clasificados por la unidad administrativa a la que pertenecen.",
    icon: "FaSitemap",
  },
  {
    id: "bienes_por_categoria",
    nombre: "Bienes por Categoría",
    descripcion:
      "Muestra los bienes organizados por su categoría general y específica.",
    icon: "FaTags",
  },
  {
    id: "bienes_por_estado_uso",
    nombre: "Bienes por Estado de Uso",
    descripcion:
      "Detalle de bienes según su estado de uso (en uso, fuera de uso, en reparación).",
    icon: "FaTools",
  },
  {
    id: "bienes_por_condicion_fisica",
    nombre: "Bienes por Condición Física",
    descripcion:
      "Reporte de bienes clasificados por su condición física (bueno, regular, malo).",
    icon: "FaHeartbeat",
  },
  {
    id: "bienes_adquiridos_por_fecha",
    nombre: "Bienes Adquiridos (Último Año)",
    descripcion: "Lista los bienes adquiridos en el último año.",
    icon: "FaCalendarAlt",
  },
];

// Función principal para generar el reporte basado en el ID
export const generarReporteBienes = (reportId) => {
  // Aquí pasamos los bienes simulados a cada función de reporte
  switch (reportId) {
    case "bienes_general":
      generarReporteGeneral(bienesSimulados);
      break;
    case "bienes_por_sede":
      generarReportePorSede(bienesSimulados);
      break;
    case "bienes_por_unidad_administrativa":
      generarReportePorUnidadAdministrativa(bienesSimulados);
      break;
    case "bienes_por_categoria":
      generarReportePorCategoria(bienesSimulados);
      break;
    case "bienes_por_estado_uso":
      generarReportePorEstadoUso(bienesSimulados);
      break;
    case "bienes_por_condicion_fisica":
      generarReportePorCondicionFisica(bienesSimulados);
      break;
    case "bienes_adquiridos_por_fecha":
      generarReporteAdquiridosPorFecha(bienesSimulados);
      break;
    default:
      alert("Reporte de bienes no implementado o no encontrado.");
      console.warn(`Reporte con ID ${reportId} no reconocido.`);
  }
};
