// src/components/Table/Table.jsx

import React, { useState, useMemo, useEffect } from "react";
import styles from "./Table.module.css";
import { FaEye, FaEdit, FaTrashAlt, FaPlus, FaSearch } from "react-icons/fa"; // Estos íconos ya están siendo usados y son elegantes

/**
 * Componente de Tabla Reutilizable con Paginación, Columna de Acciones, Botón de Agregar y Buscador.
 *
 * @param {object} props
 * @param {Array<Object>} props.data - El array de objetos que representa las filas de la tabla.
 * @param {Array<Object>} props.columns - Un array de objetos que define las columnas.
 * Cada objeto de columna debe tener:
 * - {string} key: La clave en los objetos de `data` para obtener el valor de esta columna.
 * - {string} header: El texto que se mostrará en el encabezado de la columna.
 * - {Function} [render]: (Opcional) Una función para renderizar contenido personalizado para la celda.
 * Recibe `(rowData, rowIndex)` como argumentos.
 * - {string} [align]: (Opcional) 'left', 'center', 'right' para alinear el contenido de la columna.
 * @param {string} [emptyMessage="No hay datos disponibles."] - Mensaje a mostrar si 'data' está vacío.
 * @param {number[]} [rowsPerPageOptions=[5, 10, 20, 50]] - Opciones de cantidad de filas por página.
 * @param {number} [initialRowsPerPage=10] - Cantidad inicial de filas a mostrar por página.
 * @param {Function} [onView] - Función a ejecutar al hacer clic en el botón de Ver. Recibe `(rowData)` como argumento.
 * @param {Function} [onEdit] - Función a ejecutar al hacer clic en el botón de Editar. Recibe `(rowData)` como argumento.
 * @param {Function} [onDelete] - Función a ejecutar al hacer clic en el botón de Eliminar. Recibe `(rowData)` como argumento.
 * @param {Function} [onAdd] - Función a ejecutar al hacer clic en el botón de Agregar Nuevo.
 * @param {boolean} [searchable=false] - Indica si la tabla debe tener una barra de búsqueda.
 * @param {string[]} [searchKeys] - Array de claves de columna sobre las que se realizará la búsqueda.
 * Si no se proporciona, buscará en todas las claves de las columnas.
 */
const Table = ({
  data,
  columns,
  emptyMessage = "No hay datos disponibles.",
  rowsPerPageOptions = [5, 10, 20, 50],
  initialRowsPerPage = 10,
  onView,
  onEdit,
  onDelete,
  onAdd,
  searchable = false,
  searchKeys,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCurrentPage(1);
  }, [data, rowsPerPage, searchTerm]);

  const filteredData = useMemo(() => {
    if (!searchTerm) {
      return data;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const keysToSearch =
      searchKeys || columns.map((col) => col.key).filter(Boolean);

    return data.filter((row) =>
      keysToSearch.some((key) => {
        const value = row[key];
        return String(value || "")
          .toLowerCase()
          .includes(lowerCaseSearchTerm);
      })
    );
  }, [data, searchTerm, searchKeys, columns]);

  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * rowsPerPage;
    const lastPageIndex = firstPageIndex + rowsPerPage;
    return filteredData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredData, rowsPerPage]);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const renderPageNumbers = useMemo(() => {
    const pageNumbers = [];
    const maxPageButtons = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    // Asegúrate de que el botón '1' se muestre si no está ya en el rango visible
    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push("..."); // Ellipsis
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i !== 1 && i !== totalPages) {
        // Evitar duplicar 1 y totalPages si ya están fuera del ellipsis
        pageNumbers.push(i);
      } else if (totalPages === 1) {
        // Si solo hay una página, mostrar el 1
        pageNumbers.push(i);
      }
    }

    // Asegúrate de que el botón 'totalPages' se muestre si no está ya en el rango visible
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push("..."); // Ellipsis
      }
      pageNumbers.push(totalPages);
    }

    // Filtra duplicados y ajusta el orden para los casos especiales
    const finalPageNumbers = [];
    let prev = null;
    for (const num of pageNumbers) {
      if (num === "..." && prev === "...") continue; // Evitar elipses dobles
      if (prev === 1 && num === "...") {
        // Si 1 y luego ... y la siguiente es 2, no mostrar 1...2, solo 1, 2
        if (pageNumbers[pageNumbers.indexOf(num) + 1] === 2) {
          // do nothing, it will be added below
        } else {
          finalPageNumbers.push(num);
        }
      } else if (
        num === totalPages &&
        prev === "..." &&
        totalPages - 1 === finalPageNumbers[finalPageNumbers.length - 1]
      ) {
        // Avoid ...totalPages if totalPages is just one step after the last visible number
        // and the last visible number is not already totalPages
        finalPageNumbers.push(num);
      } else if (num !== prev) {
        finalPageNumbers.push(num);
      }
      prev = num;
    }

    return (
      <>
        {finalPageNumbers.map((number, index) =>
          number === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className={styles.paginationEllipsis}
            >
              ...
            </span>
          ) : (
            <button
              key={number}
              className={`${styles.paginationButton} ${
                currentPage === number ? styles.active : ""
              }`}
              onClick={() => goToPage(number)}
              disabled={currentPage === number}
            >
              {number}
            </button>
          )
        )}
      </>
    );
  }, [currentPage, totalPages]);

  const actionColumn = useMemo(() => {
    if (onView || onEdit || onDelete) {
      return {
        key: "actions",
        header: "Acciones",
        align: "center",
        render: (rowData) => (
          <div className={styles.actionButtonsContainer}>
            {onView && (
              <button
                className={`${styles.actionButton} ${styles.viewButton}`}
                onClick={() => onView(rowData)}
                title="Ver detalles"
              >
                <FaEye size={18} />
              </button>
            )}
            {onEdit && (
              <button
                className={`${styles.actionButton} ${styles.editButton}`}
                onClick={() => onEdit(rowData)}
                title="Editar"
              >
                <FaEdit size={18} />
              </button>
            )}
            {onDelete && (
              <button
                className={`${styles.actionButton} ${styles.deleteButton}`}
                onClick={() => onDelete(rowData)}
                title="Eliminar"
              >
                <FaTrashAlt size={18} />
              </button>
            )}
          </div>
        ),
      };
    }
    return null;
  }, [onView, onEdit, onDelete]);

  const allColumns = useMemo(() => {
    return actionColumn ? [...columns, actionColumn] : columns;
  }, [columns, actionColumn]);

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableControls}>
        {onAdd && (
          <button className={styles.addNewButton} onClick={onAdd}>
            <FaPlus size={16} /> Agregar Nuevo
          </button>
        )}
        {searchable && (
          <div className={styles.searchContainer}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
          </div>
        )}
      </div>

      <div className={styles.tableContainer}>
        {totalRecords === 0 && !searchTerm ? ( // Muestra mensaje si no hay datos y no se está buscando
          <div className={styles.emptyTableMessage}>{emptyMessage}</div>
        ) : totalRecords === 0 && searchTerm ? ( // Mensaje para búsqueda sin resultados
          <div className={styles.emptyTableMessage}>
            No se encontraron resultados para "{searchTerm}"
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                {allColumns.map((col) => (
                  <th
                    key={col.key || col.header}
                    className={styles.tableHeader}
                    style={{ textAlign: col.align || "left" }}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentTableData.map((rowData, rowIndex) => (
                <tr key={rowData.id || rowIndex} className={styles.tableRow}>
                  {allColumns.map((col, colIndex) => (
                    <td
                      key={
                        col.key
                          ? `${rowData.id || rowIndex}-${col.key}`
                          : `${rowIndex}-${colIndex}`
                      }
                      className={styles.tableCell}
                      style={{ textAlign: col.align || "left" }}
                    >
                      {col.render
                        ? col.render(rowData, rowIndex)
                        : rowData[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {(totalRecords > 0 || searchTerm) && (
        <div className={styles.paginationAndInfoContainer}>
          <div className={styles.recordCount}>
            Mostrando {currentTableData.length} de {totalRecords} registros
            {searchTerm && ` (filtrado de ${data.length} totales)`}
          </div>

          {totalPages > 1 && (
            <div className={styles.paginationControls}>
              <div className={styles.paginationInfo}>
                Filas por página:
                <select
                  className={styles.rowsPerPageSelect}
                  value={rowsPerPage}
                  onChange={handleRowsPerPageChange}
                >
                  {rowsPerPageOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={styles.paginationButton}
              >
                Anterior
              </button>
              <div className={styles.pageNumbers}>{renderPageNumbers}</div>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={styles.paginationButton}
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Table;
