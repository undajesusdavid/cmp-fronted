// src/servicios/bienes/reportes/reporteBienesPorEstadoUso.js

import { exportToExcel, applyGroupHeaderStyles } from "./exportUtils";

export const generarReportePorEstadoUso = (bienes) => {
  const headers = [
    "Estado de Uso",
    "Código",
    "Descripción",
    "Sede",
    "U. Adm.",
    "Condición",
  ];
  const estados = [
    ...new Set(bienes.map((bien) => bien.estadoUsoDelBien)),
  ].sort();

  const allDataForExcel = [];
  estados.forEach((estado) => {
    const bienesEnEstado = bienes.filter(
      (bien) => bien.estadoUsoDelBien === estado
    );
    if (bienesEnEstado.length > 0) {
      allDataForExcel.push({
        "Estado de Uso": `--- Estado de Uso: ${estado} ---`,
      });
      bienesEnEstado.forEach((bien) => {
        allDataForExcel.push(bien);
      });
      allDataForExcel.push({});
    }
  });

  const dataMapper = (row) => {
    if (
      row["Estado de Uso"] &&
      typeof row["Estado de Uso"] === "string" &&
      row["Estado de Uso"].startsWith("--- Estado de Uso:")
    ) {
      return {
        "Estado de Uso": row["Estado de Uso"],
        Código: "",
        Descripción: "",
        Sede: "",
        "U. Adm.": "",
        Condición: "",
      };
    }
    return {
      "Estado de Uso": row.estadoUsoDelBien || "N/A",
      Código: row.codigoInternoDelBien || "N/A",
      Descripción: row.descripcion || "N/A",
      Sede: row.sede || "N/A",
      "U. Adm.": row.unidadAdministrativa || "N/A",
      Condición: row.condicionFisica || "N/A",
    };
  };

  const postProcessSheet = (ws, mappedData, headers) => {
    applyGroupHeaderStyles(
      ws,
      mappedData,
      headers,
      "Estado de Uso",
      "FFCCE5FF"
    ); // Azul claro para estado de uso
  };

  exportToExcel(
    allDataForExcel,
    headers,
    "Bienes_por_Estado_Uso",
    "Por Estado de Uso",
    dataMapper,
    postProcessSheet
  );
};
