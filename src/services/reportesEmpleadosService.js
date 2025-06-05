// src/services/reportesEmpleadosService.js

import { jsPDF } from "jspdf";
// Importa tus datos simulados de empleados (si los usas para llenar los PDFs)
import empleadosData from "../private_pages/Empleados/data/empleadosData";

/**
 * Servicio para encapsular la lógica de generación y manejo de reportes de empleados.
 * En un entorno real, estas funciones interactuarían con una API y datos dinámicos.
 */

// Datos simulados de reportes.
export const reportesDisponibles = [
  {
    id: "empleados-activos",
    nombre: "Listado de Empleados Activos",
    descripcion:
      "Genera un listado completo de todo el personal actualmente activo en la institución.",
    icon: "FaUsers",
    link: "/reportes/generar/empleados-activos",
  },
  {
    id: "movimientos-personal",
    nombre: "Movimientos de Personal",
    descripcion:
      "Reporte de ingresos y egresos de empleados por período, útil para análisis de rotación.",
    icon: "FaChartLine",
    link: "/reportes/generar/movimientos-personal",
  },
  {
    id: "por-departamento-cargo",
    nombre: "Personal por Departamento y Cargo",
    descripcion:
      "Visualiza la distribución de empleados por cada departamento y su cargo asignado.",
    icon: "FaBuilding",
    link: "/reportes/generar/por-departamento-cargo",
  },
  {
    id: "datos-demograficos",
    nombre: "Datos Demográficos",
    descripcion:
      "Estadísticas de edad, género, nacionalidad y estado civil del personal.",
    icon: "FaClipboardList",
    link: "/reportes/generar/datos-demograficos",
  },
  {
    id: "tallas-uniformes",
    nombre: "Tallas de Uniformes",
    descripcion:
      "Consolidado de tallas de zapatos, camisas y pantalones para la gestión de uniformes.",
    icon: "FaRulerCombined",
    link: "/reportes/generar/tallas-uniformes",
  },
  {
    id: "carnet-patria-conadpis",
    nombre: "Carnet de la Patria / CONADIS",
    descripcion:
      "Listado de personal que posee Carnet de la Patria y/o registro en CONADIS.",
    icon: "FaIdCard",
    link: "/reportes/generar/carnet-patria-conadpis",
  },
];

/**
 * Genera un reporte PDF de Empleados Activos.
 */
export const generarReporteEmpleadosActivosPDF = () => {
  const doc = new jsPDF();
  let y = 10; // Posición inicial en Y

  doc.setFontSize(18);
  doc.text("Listado de Empleados Activos", 10, y);
  y += 10;
  doc.setFontSize(10);
  doc.text(`Fecha de Emisión: ${new Date().toLocaleDateString()}`, 10, y);
  y += 15;

  doc.setFontSize(12);
  // Simular datos para el reporte
  const empleadosActivos = empleadosData.filter((emp) => emp.activo); // Asumiendo que tienes una propiedad 'activo'

  if (empleadosActivos.length === 0) {
    doc.text("No hay empleados activos para reportar.", 10, y);
  } else {
    empleadosActivos.forEach((empleado, index) => {
      // Si llegamos al final de la página, añadir una nueva página
      if (y > 280) {
        // Aproximadamente el final de una página A4
        doc.addPage();
        y = 10;
        doc.setFontSize(18);
        doc.text("Listado de Empleados Activos (Continuación)", 10, y);
        y += 15;
        doc.setFontSize(12);
      }

      doc.text(`${index + 1}. Cédula: ${empleado.cedula}`, 10, y);
      doc.text(`   Nombre: ${empleado.nombre} ${empleado.apellido}`, 10, y + 6);
      doc.text(`   Cargo: ${empleado.cargo?.nombre || "N/A"}`, 10, y + 12);
      doc.text(
        `   Departamento: ${empleado.departamento?.nombre || "N/A"}`,
        10,
        y + 18
      );
      y += 25; // Espacio entre empleados
    });
  }

  doc.save("reporte_empleados_activos.pdf");
  alert("Reporte de Empleados Activos generado.");
};

/**
 * Genera un reporte PDF de Movimientos de Personal (simulado).
 */
export const generarReporteMovimientosPersonalPDF = () => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Reporte de Movimientos de Personal", 10, 10);
  doc.setFontSize(12);
  doc.text(`Fecha de Emisión: ${new Date().toLocaleDateString()}`, 10, 20);
  doc.text("Este reporte incluiría ingresos y egresos por período.", 10, 40);
  doc.text("Funcionalidad de filtro y datos detallados aquí.", 10, 50);
  doc.save("reporte_movimientos_personal.pdf");
  alert("Reporte de Movimientos de Personal generado.");
};

/**
 * Genera un reporte PDF de Personal por Departamento y Cargo (simulado).
 */
export const generarReportePersonalPorDepartamentoCargoPDF = () => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Reporte de Personal por Departamento y Cargo", 10, 10);
  doc.setFontSize(12);
  doc.text(`Fecha de Emisión: ${new Date().toLocaleDateString()}`, 10, 20);

  // Agrupar empleados por departamento y cargo (lógica simulada)
  const empleadosPorDepto = empleadosData.reduce((acc, empleado) => {
    const deptoNombre = empleado.departamento?.nombre || "Sin Departamento";
    if (!acc[deptoNombre]) {
      acc[deptoNombre] = [];
    }
    acc[deptoNombre].push(empleado);
    return acc;
  }, {});

  let y = 40;
  for (const depto in empleadosPorDepto) {
    if (y > 280) {
      doc.addPage();
      y = 10;
    } // Nueva página si es necesario
    doc.setFontSize(14);
    doc.text(`Departamento: ${depto}`, 10, y);
    y += 10;
    doc.setFontSize(10);
    empleadosPorDepto[depto].forEach((empleado) => {
      if (y > 280) {
        doc.addPage();
        y = 10;
      } // Nueva página si es necesario
      doc.text(
        `  - ${empleado.nombre} ${empleado.apellido} (${
          empleado.cargo?.nombre || "N/A"
        })`,
        15,
        y
      );
      y += 7;
    });
    y += 15; // Espacio entre departamentos
  }

  doc.save("reporte_personal_departamento_cargo.pdf");
  alert("Reporte de Personal por Departamento y Cargo generado.");
};

/**
 * Genera un reporte PDF de Datos Demográficos (simulado).
 */
export const generarReporteDatosDemograficosPDF = () => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Reporte de Datos Demográficos", 10, 10);
  doc.setFontSize(12);
  doc.text(`Fecha de Emisión: ${new Date().toLocaleDateString()}`, 10, 20);
  doc.text(
    "Este reporte contendría estadísticas sobre edad, género, nacionalidad, etc.",
    10,
    40
  );
  doc.save("reporte_datos_demograficos.pdf");
  alert("Reporte de Datos Demográficos generado.");
};

/**
 * Genera un reporte PDF de Tallas de Uniformes (simulado).
 */
export const generarReporteTallasUniformesPDF = () => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Reporte de Tallas de Uniformes", 10, 10);
  doc.setFontSize(12);
  doc.text(`Fecha de Emisión: ${new Date().toLocaleDateString()}`, 10, 20);
  doc.text(
    "Listado de tallas de zapatos, camisas y pantalones por empleado.",
    10,
    40
  );

  let y = 50;
  empleadosData.forEach((empleado, index) => {
    if (y > 280) {
      doc.addPage();
      y = 10;
    }
    doc.text(`${index + 1}. ${empleado.nombre} ${empleado.apellido}:`, 10, y);
    doc.text(`   Zapato: ${empleado.tallas?.zapato || "N/A"}`, 15, y + 6);
    doc.text(`   Camisa: ${empleado.tallas?.camisa || "N/A"}`, 15, y + 12);
    doc.text(`   Pantalón: ${empleado.tallas?.pantalon || "N/A"}`, 15, y + 18);
    y += 25;
  });

  doc.save("reporte_tallas_uniformes.pdf");
  alert("Reporte de Tallas de Uniformes generado.");
};

/**
 * Genera un reporte PDF de Carnet de la Patria / CONADIS (simulado).
 */
export const generarReporteCarnetPatriaConadpisPDF = () => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Reporte Carnet de la Patria / CONADIS", 10, 10);
  doc.setFontSize(12);
  doc.text(`Fecha de Emisión: ${new Date().toLocaleDateString()}`, 10, 20);
  doc.text(
    "Listado de personal con Carnet de la Patria y/o registro CONADIS.",
    10,
    40
  );

  let y = 50;
  const filteredEmpleados = empleadosData.filter(
    (emp) => emp.tiene_carnet_patria || emp.conadpis
  );

  if (filteredEmpleados.length === 0) {
    doc.text(
      "No hay empleados con Carnet de la Patria o CONADIS para reportar.",
      10,
      y
    );
  } else {
    filteredEmpleados.forEach((empleado, index) => {
      if (y > 280) {
        doc.addPage();
        y = 10;
      }
      doc.text(
        `${index + 1}. ${empleado.nombre} ${empleado.apellido} (C.I.: ${
          empleado.cedula
        })`,
        10,
        y
      );
      if (empleado.tiene_carnet_patria) {
        doc.text(
          `   Carnet Patria: Código ${empleado.codigo_carnet_patria}, Serial ${empleado.serial_carnet_patria}`,
          15,
          y + 6
        );
      }
      if (empleado.conadpis) {
        doc.text(
          `   Tiene CONADIS`,
          15,
          y + (empleado.tiene_carnet_patria ? 12 : 6)
        );
      }
      y +=
        empleado.tiene_carnet_patria && empleado.conadpis
          ? 20
          : empleado.tiene_carnet_patria || empleado.conadpis
          ? 14
          : 7;
    });
  }

  doc.save("reporte_carnet_patria_conadpis.pdf");
  alert("Reporte de Carnet de la Patria / CONADIS generado.");
};

/**
 * Función principal para generar el reporte específico según su ID.
 * Esta función es la que será llamada desde el componente de la UI.
 *
 * @param {string} reportId - El ID del reporte a generar.
 */
export const generarReporteEmpleados = (reportId) => {
  switch (reportId) {
    case "empleados-activos":
      generarReporteEmpleadosActivosPDF();
      break;
    case "movimientos-personal":
      generarReporteMovimientosPersonalPDF();
      break;
    case "por-departamento-cargo":
      generarReportePersonalPorDepartamentoCargoPDF();
      break;
    case "datos-demograficos":
      generarReporteDatosDemograficosPDF();
      break;
    case "tallas-uniformes":
      generarReporteTallasUniformesPDF();
      break;
    case "carnet-patria-conadpis":
      generarReporteCarnetPatriaConadpisPDF();
      break;
    default:
      console.warn(
        `Reporte con ID "${reportId}" no tiene una función de generación definida.`
      );
      alert("Reporte no disponible actualmente.");
  }
};
