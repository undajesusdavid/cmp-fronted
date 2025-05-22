// src/servicios/bienes/reportes/reporteBienesPorUnidadAdministrativa.js

import { exportToExcel, applyGroupHeaderStyles } from "./exportUtils";

export const generarReportePorUnidadAdministrativa = (bienes) => {
  const headers = [
    "Unidad Administrativa",
    "Código",
    "Descripción",
    "Sede",
    "Estado",
    "Condición",
  ];
  const unidades = [
    ...new Set(bienes.map((bien) => bien.unidadAdministrativa)),
  ].sort();

  const allDataForExcel = [];
  unidades.forEach((unidad) => {
    const bienesEnUnidad = bienes.filter(
      (bien) => bien.unidadAdministrativa === unidad
    );
    if (bienesEnUnidad.length > 0) {
      allDataForExcel.push({
        "Unidad Administrativa": `--- Unidad: ${unidad} ---`,
      });
      bienesEnUnidad.forEach((bien) => {
        allDataForExcel.push(bien);
      });
      allDataForExcel.push({});
    }
  });

  const dataMapper = (row) => {
    if (
      row["Unidad Administrativa"] &&
      typeof row["Unidad Administrativa"] === "string" &&
      row["Unidad Administrativa"].startsWith("--- Unidad:")
    ) {
      return {
        "Unidad Administrativa": row["Unidad Administrativa"],
        Código: "",
        Descripción: "",
        Sede: "",
        Estado: "",
        Condición: "",
      };
    }
    return {
      "Unidad Administrativa": row.unidadAdministrativa || "N/A",
      Código: row.codigoInternoDelBien || "N/A",
      Descripción: row.descripcion || "N/A",
      Sede: row.sede || "N/A",
      Estado: row.estadoUsoDelBien || "N/A",
      Condición: row.condicionFisica || "N/A",
    };
  };

  const postProcessSheet = (ws, mappedData, headers) => {
    applyGroupHeaderStyles(
      ws,
      mappedData,
      headers,
      "Unidad Administrativa",
      "FFCCFFCC"
    ); // Verde claro para unidad administrativa
  };

  exportToExcel(
    allDataForExcel,
    headers,
    "Bienes_por_Unidad_Administrativa",
    "Por U. Adm.",
    dataMapper,
    postProcessSheet
  );
};
