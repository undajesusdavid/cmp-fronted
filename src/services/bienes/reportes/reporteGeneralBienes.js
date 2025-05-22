// src/servicios/bienes/reportes/reporteGeneralBienes.js

import { exportToExcel } from "./exportUtils";

export const generarReporteGeneral = (bienes) => {
  const headers = [
    "Código",
    "Descripción",
    "Sede",
    "U. Adm.",
    "Adquisición",
    "Valor",
    "Estado",
    "Condición",
  ];

  const dataMapper = (row) => {
    const valor = parseFloat(row.valorAdquisicion);
    return {
      Código: row.codigoInternoDelBien || "N/A",
      Descripción: row.descripcion || "N/A",
      Sede: row.sede || "N/A",
      "U. Adm.": row.unidadAdministrativa || "N/A",
      Adquisición: `${row.formaAdquisicion || "N/A"} (${
        row.fechaAdquisicion || "N/A"
      })`,
      Valor: `${row.moneda || ""} ${isNaN(valor) ? "N/A" : valor.toFixed(2)}`,
      Estado: row.estadoUsoDelBien || "N/A",
      Condición: row.condicionFisica || "N/A",
    };
  };

  exportToExcel(
    bienes,
    headers,
    "Listado_General_Bienes",
    "Bienes Generales",
    dataMapper
  );
};
