import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import styles from "./ListadoUsuarios.module.css";
import {getAllUsers} from "../../api/Users/UserController";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const usuariosColumns = [
  { key: "username", header: "Nombre de Usuario", align: "center" },
];

const ListadoUsuarios = () => {
  const [usuariosData, setUsuariosData]  = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetUsers = async () => {
    setLoading(true)
    const res = await getAllUsers();
    if(res.data) setUsuariosData(res.data);
    if(res.error) setError(res.error);
    setLoading(false)
  }

  useEffect(() => {
    handleGetUsers();
  },[]);


  const handleAdd = () => {};
  const handleView = () => {};
  const handleEdit = () => {};
  const handleDelete = () => {};

  if(loading){
    return <LoadingSpinner />
  }

  return (
    <div className={styles.subPageContent}>
      <h2>Usuarios</h2>
      <p>Aquí puedes crear, editar y eliminar usuarios del sistema.</p>
      <Table
        data={usuariosData}
        columns={usuariosColumns}
        rowsPerPageOptions={[3, 5, 10, 15, 20]}
        initialRowsPerPage={10}
        onAdd={handleAdd}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchable={true}
        searchKeys={["username"]}
        emptyMessage={(error)? error: "No hay usuarios registrados en este momento."}
      />
    </div>
  );
};

export default ListadoUsuarios;
