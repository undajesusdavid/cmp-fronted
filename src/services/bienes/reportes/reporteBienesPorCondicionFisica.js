// src/servicios/bienes/reportes/reporteBienesPorCondicionFisica.js

import { exportToExcel, applyGroupHeaderStyles } from "./exportUtils";

export const generarReportePorCondicionFisica = (bienes) => {
  const headers = [
    "Condición Física",
    "Código",
    "Descripción",
    "Sede",
    "U. Adm.",
    "Estado",
  ];
  const condiciones = [
    ...new Set(bienes.map((bien) => bien.condicionFisica)),
  ].sort();

  const allDataForExcel = [];
  condiciones.forEach((condicion) => {
    const bienesEnCondicion = bienes.filter(
      (bien) => bien.condicionFisica === condicion
    );
    if (bienesEnCondicion.length > 0) {
      allDataForExcel.push({
        "Condición Física": `--- Condición Física: ${condicion} ---`,
      });
      bienesEnCondicion.forEach((bien) => {
        allDataForExcel.push(bien);
      });
      allDataForExcel.push({});
    }
  });

  const dataMapper = (row) => {
    if (
      row["Condición Física"] &&
      typeof row["Condición Física"] === "string" &&
      row["Condición Física"].startsWith("--- Condición Física:")
    ) {
      return {
        "Condición Física": row["Condición Física"],
        Código: "",
        Descripción: "",
        Sede: "",
        "U. Adm.": "",
        Estado: "",
      };
    }
    return {
      "Condición Física": row.condicionFisica || "N/A",
      Código: row.codigoInternoDelBien || "N/A",
      Descripción: row.descripcion || "N/A",
      Sede: row.sede || "N/A",
      "U. Adm.": row.unidadAdministrativa || "N/A",
      Estado: row.estadoUsoDelBien || "N/A",
    };
  };

  const postProcessSheet = (ws, mappedData, headers) => {
    applyGroupHeaderStyles(
      ws,
      mappedData,
      headers,
      "Condición Física",
      "FFFFD9CC"
    ); // Naranja claro para condición física
  };

  exportToExcel(
    allDataForExcel,
    headers,
    "Bienes_por_Condicion_Fisica",
    "Por Condición Física",
    dataMapper,
    postProcessSheet
  );
};
