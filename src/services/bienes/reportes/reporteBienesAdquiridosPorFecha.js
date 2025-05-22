// src/servicios/bienes/reportes/reporteBienesAdquiridosPorFecha.js

import { exportToExcel } from "./exportUtils";

export const generarReporteAdquiridosPorFecha = (bienes) => {
  const headers = [
    "Fecha Adq.",
    "Código",
    "Descripción",
    "Sede",
    "Valor",
    "Documento",
  ];
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const bienesRecientes = bienes
    .filter((bien) => {
      const adquisicionDate = new Date(bien.fechaAdquisicion);
      return adquisicionDate >= oneYearAgo;
    })
    .sort(
      (a, b) => new Date(a.fechaAdquisicion) - new Date(b.fechaAdquisicion)
    );

  if (bienesRecientes.length === 0) {
    alert(
      "No hay bienes adquiridos en el último año para generar este reporte."
    );
    return;
  }

  const dataMapper = (row) => {
    const valor = parseFloat(row.valorAdquisicion);
    return {
      "Fecha Adq.": row.fechaAdquisicion || "N/A",
      Código: row.codigoInternoDelBien || "N/A",
      Descripción: row.descripcion || "N/A",
      Sede: row.sede || "N/A",
      Valor: `${row.moneda || ""} ${isNaN(valor) ? "N/A" : valor.toFixed(2)}`,
      Documento: row.numeroDocumento || "N/A",
    };
  };

  exportToExcel(
    bienesRecientes,
    headers,
    "Bienes_Adquiridos_Ultimo_Anio",
    "Adquiridos (Último Año)",
    dataMapper
  );
};
