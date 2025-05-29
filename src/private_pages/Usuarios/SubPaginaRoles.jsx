import styles from "./ListadoUsuarios.module.css";
import { getAllRoles } from "../../api/Users/RolController.js";
import { useEffect, useState } from "react";
import Table from "../../components/Table/Table.jsx";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";

const rolesColumns = [
  { key: "nombre", header: "Nombre", align: "center" },
  { key: "descripcion", header: "Descripción", align: "center" },
];

const SubPaginaRoles = () => {
  const [rolesData, setRolesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetRoles = async () => {
    setLoading(true);
    const res = await getAllRoles();
    if (res.data) setRolesData(res.data);
    if (res.error) setError(res.error);
    setLoading(false);
  };

  useEffect(() => {
    handleGetRoles();
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
      <h2>Roles de Usuario</h2>
      <p>Aquí puedes crear, editar y eliminar roles de usuario.</p>
      <Table
        data={rolesData}
        columns={rolesColumns}
        rowsPerPageOptions={[3, 5, 10, 15, 20]}
        initialRowsPerPage={10}
        onAdd={handleAdd}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchable={true}
        searchKeys={["username"]}
        emptyMessage={
          error ? error : "No hay roles registrados en este momento."
        }
      />
    </div>
  );
};

export default SubPaginaRoles;
