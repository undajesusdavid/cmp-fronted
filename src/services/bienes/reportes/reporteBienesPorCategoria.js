// src/servicios/bienes/reportes/reporteBienesPorCategoria.js

import { exportToExcel, applyGroupHeaderStyles } from "./exportUtils";

export const generarReportePorCategoria = (bienes) => {
  const headers = [
    "Categoría",
    "Código",
    "Descripción",
    "Subcategoría",
    "Estado",
    "Condición",
  ];
  const categorias = [
    ...new Set(bienes.map((bien) => bien.categoriaGeneral)),
  ].sort();

  const allDataForExcel = [];
  categorias.forEach((cat) => {
    const bienesEnCat = bienes.filter((bien) => bien.categoriaGeneral === cat);
    if (bienesEnCat.length > 0) {
      allDataForExcel.push({ Categoría: `--- Categoría: ${cat} ---` });
      bienesEnCat.forEach((bien) => {
        allDataForExcel.push(bien);
      });
      allDataForExcel.push({});
    }
  });

  const dataMapper = (row) => {
    if (
      row["Categoría"] &&
      typeof row["Categoría"] === "string" &&
      row["Categoría"].startsWith("--- Categoría:")
    ) {
      return {
        Categoría: row["Categoría"],
        Código: "",
        Descripción: "",
        Subcategoría: "",
        Estado: "",
        Condición: "",
      };
    }
    return {
      Categoría: row.categoriaGeneral || "N/A",
      Código: row.codigoInternoDelBien || "N/A",
      Descripción: row.descripcion || "N/A",
      Subcategoría: `${row.subcategoria || "N/A"} (${
        row.categoriaEspecifica || "N/A"
      })`,
      Estado: row.estadoUsoDelBien || "N/A",
      Condición: row.condicionFisica || "N/A",
    };
  };

  const postProcessSheet = (ws, mappedData, headers) => {
    applyGroupHeaderStyles(ws, mappedData, headers, "Categoría", "FFFFCCCC"); // Rosa claro para categoría
  };

  exportToExcel(
    allDataForExcel,
    headers,
    "Bienes_por_Categoria",
    "Por Categoría",
    dataMapper,
    postProcessSheet
  );
};
