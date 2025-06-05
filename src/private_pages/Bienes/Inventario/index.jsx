
import styles from "./index.module.css";
import { useNavigate, Outlet, useMatch } from "react-router-dom";
import inventarioBienesData from "../data/inventarioBienesData";
import Table from "../../../components/Table/Table";
const InventarioBienes = () => {
  const navigate = useNavigate();
  const inCurrentPage = useMatch('/bienes/inventario');

  // Funciones de ejemplo para las acciones
  const handleView = (rowData) => {
    console.log("Ver detalles de:", rowData);
    // Aquí podrías abrir un modal con los detalles completos del bien
    alert(`Ver detalles del bien: ${rowData.descripcion} (ID: ${rowData.id})`);
  };

  const handleEdit = (rowData) => {
    console.log("Editar bien:", rowData);
    // Aquí podrías redirigir a una página de edición o abrir un formulario en un modal
    alert(`Editar bien: ${rowData.descripcion} (ID: ${rowData.id})`);
  };

  const handleDelete = (rowData) => {
    console.log("Eliminar bien:", rowData);
    // Aquí podrías mostrar una confirmación y luego eliminar el bien del estado/API
    if (
      window.confirm(
        `¿Estás seguro de que quieres eliminar el bien "${rowData.descripcion}"?`
      )
    ) {
      alert(`Bien "${rowData.descripcion}" eliminado (simulado).`);
      // Lógica real para eliminar, por ejemplo:
      // setBienesData(prevData => prevData.filter(item => item.id !== rowData.id));
    }
  };

  // Función para el botón "Agregar Nuevo Bien"
  const handleAddNewBien = () => {
    navigate("/bienes/inventario/agregar/");
  };
  // Columnas para la tabla
  const inventoryColumns = [
    { key: "sede", header: "Sede" },
    { key: "codigoInternoDelBien", header: "Cód. Interno", align: "center" },
    { key: "descripcion", header: "Descripción" },
    { key: "marca", header: "Marca" },
    { key: "estadoUsoDelBien", header: "Estado de Uso", align: "center" },
    { key: "condicionFisica", header: "Condición Física", align: "center" },

    // { // Ejemplo de cómo usar 'render' si quisieras combinar o formatear campos
    //   key: "ubicacion",
    //   header: "Ubicación",
    //   render: (rowData) => (
    //     <span>{rowData.sede} - {rowData.unidadAdministrativa}</span>
    //   ),
    // },
  ];

  if (inCurrentPage) {
    return (
      <div className={styles.inventarioContainer}>
        <Table
          columns={inventoryColumns}
          data={inventarioBienesData}
          rowsPerPageOptions={[3, 5, 10, 15, 20]}
          initialRowsPerPage={5}
          onAdd={handleAddNewBien}
          onView={handleView} // Pasamos la función onView al componente Table
          onEdit={handleEdit} // Pasamos la función onEdit al componente Table
          onDelete={handleDelete} // Pasamos la función onDelete al componente Table
          searchable={true} // Habilita el buscador
          searchKeys={[
            "descripcion",
            "marca",
            "codigoInternoDelBien",
            "unidadAdministrativa",
          ]} // Opcional: Define las claves para buscar
        />
      </div>
    );
  }

  return (
    <div className={styles.inventarioContainer}>
      <Outlet />
    </div>
  );
};

export default InventarioBienes;
