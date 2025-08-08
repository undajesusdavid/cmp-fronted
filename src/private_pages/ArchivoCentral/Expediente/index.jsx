import { Outlet, useMatch, useNavigate } from "react-router-dom";

import { getExpedientes } from "../../../api/CentralArchive/ExpedienteController";
import ErrorMessage from "../../../components/ErrorMessage";

import Table from "../../../components/Table/Table";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ExpedienteModule = ({}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const inCurrentPage = useMatch("/archivo-central/expedientes");

  const fetchData = async () => {
    setLoading(true);
    try {
      setData(await getExpedientes());
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

  const handleAdd = () => {};

  const columns = [
    { key: "codigo", header: "Codigo", align: "center" },
    { key: "descripcion", header: "Descripcion", align: "center" },
    { key: "fecha", header: "Fecha", align: "center" },
    {
      key: "piezas",
      header: "Num. Piezas",
      align: "center",
      render: (row) => row?.elementos.length,
    },
  ];

  if (loading)
    return <LoadingSpinner message="Cargando Listado de Expedientes" />;

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

export default ExpedienteModule;
