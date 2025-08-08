import { Outlet, useMatch, useNavigate } from "react-router-dom";

import { getContenedores } from "../../../api/CentralArchive/ContenedorController";
import ErrorMessage from "../../../components/ErrorMessage";

import Table from "../../../components/Table/Table";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ContenedorModule = ({}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const inCurrentPage = useMatch("/archivo-central/contenedores");

  const fetchData = async () => {
    setLoading(true);
    try {
      setData(await getContenedores());
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let firstLoad = true;
    if (inCurrentPage && firstLoad) {
      fetchData();
      firstLoad = false;
    }
    return () => {
      firstLoad = true;
    };
  }, [inCurrentPage]);

  const handleView = (row) => {};

  const handleEdit = (row) => {};

  const handleDelete = (row) => {};

  const handleAdd = () => {
    navigate("/archivo-central/contenedores/agregar");
  };

  const columns = [
    {
      key: "departamento",
      header: "Departamento",
      align: "center",
      render: (row) => row?.departamento.nombre,
    },
    {
      key: "unidad_conservacion",
      header: "Unidad de Conservaciòn",
      align: "center",
      render: (row) => row?.unidad_conservacion.nombre,
    },
    { key: "descripcion", header: "Descripcion", align: "center" },
    { key: "ubicacion", header: "Ubicacion", align: "center" },
    { key: "ejercicio", header: "Ejercicio Fiscal", align: "center" },
  ];

  if (loading)
    return <LoadingSpinner message="Cargando Listado de Contenedores" />;

  if (inCurrentPage) {
    return (
      <div>
        {error && loading === false && (
          <ErrorMessage message={error?.message || "Error de servidor"} />
        )}
        <Table
          data={data}
          columns={columns}
          onAdd={handleAdd}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          rowsPerPageOptions={[5, 10, 20]}
          initialRowsPerPage={10}
          searchable={true}
        />
      </div>
    );
  }

  return (
    <div className="subPageContent">
      <Outlet />
    </div>
  );
};

export default ContenedorModule;
