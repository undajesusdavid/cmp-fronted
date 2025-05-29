import styles from "./ListadoUsuarios.module.css";
import { getAllPermisos } from "../../api/Users/PermisosController.js";
import { useEffect, useState } from "react";
import Table from "../../components/Table/Table.jsx";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";

const permisosColumns = [
  { key: "nombre", header: "Nombre", align: "center" },
  { key: "descripcion", header: "Descripción", align: "center" },
];

const SubPaginaRoles = () => {
  const [permisosData, setPermisosData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetPermisos = async () => {
    setLoading(true);
    const res = await getAllPermisos();
    if (res.data) setPermisosData(res.data);
    if (res.error) setError(res.error);
    setLoading(false);
  };

  useEffect(() => {
    handleGetPermisos();
  }, []);

  const handleAdd = () => {};
  const handleView = () => {};
  const handleEdit = () => {};
  const handleDelete = () => {};

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.subPageContent}>
      <h2>Permisos de Usuario</h2>
      <p>Aquí puedes crear, editar y eliminar permisos de usuario.</p>
      <Table
        data={permisosData}
        columns={permisosColumns}
        rowsPerPageOptions={[3, 5, 10, 15, 20]}
        initialRowsPerPage={10}
        onAdd={handleAdd}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchable={true}
        searchKeys={["username"]}
        emptyMessage={
          error ? error : "No hay permisos registrados en este momento."
        }
      />
    </div>
  );
};

export default SubPaginaRoles;
