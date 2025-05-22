// src/servicios/bienes/reportes/exportUtils.js

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

/**
 * Función genérica para exportar datos a un archivo Excel.
 * @param {Array<Object>} data Los datos en formato de array de objetos.
 * @param {Array<string>} headers Los encabezados que se usarán en el archivo Excel.
 * @param {string} fileName El nombre del archivo Excel a guardar (sin extensión).
 * @param {string} sheetName El nombre de la hoja dentro del archivo Excel.
 * @param {Function} dataMapper Una función que mapea el objeto de datos original a un objeto con las claves de los headers.
 * Ej: (row) => ({ 'Código': row.codigoInternoDelBien, 'Descripción': row.descripcion })
 * @param {Function} postProcessSheet Una función opcional para aplicar estilos o fusiones a la hoja de cálculo.
 * Recibe (ws, mappedData, headers)
 */
export const exportToExcel = (
  data,
  headers,
  fileName,
  sheetName = "Reporte",
  dataMapper,
  postProcessSheet = null
) => {
  const formattedData = data.map(dataMapper);

  const ws = XLSX.utils.json_to_sheet(formattedData, { header: headers });

  // Aplica cualquier post-procesamiento (estilos, fusiones)
  if (postProcessSheet && typeof postProcessSheet === "function") {
    postProcessSheet(ws, formattedData, headers);
  }

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const dataBlob = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });
  saveAs(dataBlob, `${fileName}.xlsx`);
};

// Función para aplicar estilos y fusiones a los encabezados de grupo
export const applyGroupHeaderStyles = (
  ws,
  mappedData,
  headers,
  groupKey,
  color
) => {
  mappedData.forEach((row, i) => {
    // Comprobamos si la fila es un marcador de grupo por su contenido y tipo
    if (
      row[groupKey] &&
      typeof row[groupKey] === "string" &&
      row[groupKey].startsWith("---")
    ) {
      const cellAddress = XLSX.utils.encode_cell({ r: i + 1, c: 0 }); // +1 por la fila de encabezados que añade json_to_sheet
      if (!ws[cellAddress]) ws[cellAddress] = {};
      ws[cellAddress].s = {
        // Estilo para negrita y color de fondo
        font: { bold: true },
        fill: { fgColor: { rgb: color } },
      };
      // Fusionar celdas para el encabezado de grupo a lo largo de todas las columnas del reporte
      const range = XLSX.utils.encode_range({
        s: { r: i + 1, c: 0 },
        e: { r: i + 1, c: headers.length - 1 },
      });
      if (!ws["!merges"]) ws["!merges"] = [];
      ws["!merges"].push(XLSX.utils.decode_range(range));
    }
  });
};
