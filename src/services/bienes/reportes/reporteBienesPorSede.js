// src/servicios/bienes/reportes/reporteBienesPorSede.js

import { exportToExcel, applyGroupHeaderStyles } from "./exportUtils";

export const generarReportePorSede = (bienes) => {
  const headers = [
    "Sede",
    "Código",
    "Descripción",
    "U. Adm.",
    "Estado",
    "Condición",
  ];
  const sedes = [...new Set(bienes.map((bien) => bien.sede))].sort();

  const allDataForExcel = [];
  sedes.forEach((sede) => {
    const bienesEnSede = bienes.filter((bien) => bien.sede === sede);
    if (bienesEnSede.length > 0) {
      // Marcador para el encabezado de grupo. La clave 'Sede' aquí es importante
      // para que `dataMapper` y `applyGroupHeaderStyles` la reconozcan.
      allDataForExcel.push({ Sede: `--- Sede: ${sede} ---` });
      bienesEnSede.forEach((bien) => {
        allDataForExcel.push(bien);
      });
      allDataForExcel.push({}); // Línea en blanco para separar grupos
    }
  });

  const dataMapper = (row) => {
    // Si es un marcador de grupo, lo devuelve tal cual para que exportToExcel lo procese
    if (
      row.Sede &&
      typeof row.Sede === "string" &&
      row.Sede.startsWith("--- Sede:")
    ) {
      return {
        Sede: row.Sede,
        Código: "",
        Descripción: "",
        "U. Adm.": "",
        Estado: "",
        Condición: "",
      };
    }
    // Para los datos reales, mapea las propiedades del bien a los headers
    return {
      Sede: row.sede || "N/A",
      Código: row.codigoInternoDelBien || "N/A",
      Descripción: row.descripcion || "N/A",
      "U. Adm.": row.unidadAdministrativa || "N/A",
      Estado: row.estadoUsoDelBien || "N/A",
      Condición: row.condicionFisica || "N/A",
    };
  };

  const postProcessSheet = (ws, mappedData, headers) => {
    // Aplica los estilos de negrita y color al encabezado de grupo
    applyGroupHeaderStyles(ws, mappedData, headers, "Sede", "FFFFCC00"); // Amarillo para sede
  };

  exportToExcel(
    allDataForExcel,
    headers,
    "Bienes_por_Sede",
    "Por Sede",
    dataMapper,
    postProcessSheet
  );
};
