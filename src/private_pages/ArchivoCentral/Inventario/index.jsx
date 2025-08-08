import Table from "../../../components/Table/Table";
import "../../stylesPrivatePages.css";
import { useEffect, useState } from "react";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import { getAllInventory } from "../../../api/CentralArchive/InventoryController";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import ErrorMessage from "../../../components/ErrorMessage";

const InventarioDocumental = () => {
  const navigate = useNavigate();
  const inCurrentPage = useMatch("/archivo-central/elementos");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [inventarioData, setInventarioData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      setInventarioData(await getAllInventory());
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }

    setLoading(false);
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

  const handleAdd = () => navigate("agregar");
  const handleView = (rowData) => {
    navigate(`/archivo-central/inventario/detalle/${rowData.id}`);
  };
  const handleEdit = () => {};
  const handleDelete = () => {};

  const DataColumns = [
    {
      key: "clasificacion",
      header: "Clasificación",
      align: "center",
      render: (row) =>
        (
          <div>
            <p style={{ fontWeight: "bold" }}>{row.clasificacion.serie}</p>
            <p>{row?.clasificacion.subserie}</p>
          </div>
        ) || "No disponible",
    },
    {
      key: "codigo",
      header: "Codigo Arch.",
      align: "center",
      render: (row) => row?.codigo || "Sin condigo",
    },
    {
      key: "titulo",
      header: "Descripción ",
      align: "center",
      render: (row) =>
        (
          <div
            style={{
              textTransform: "uppercase",
              wordBreak: "break-word",
              whiteSpace: "normal",
              width: "100%",
              overflowWrap: "break-word",
            }}
          >
            {row.titulo}
          </div>
        ) || "No disponible",
    },
    {
      key: "ejercicio_fiscal",
      header: "Ejericio Fiscal",
      align: "center",
    },
  ];

  if (loading) {
    return <LoadingSpinner message="Cargando Listado de Elementos Archivados"/>;
  }

  if (inCurrentPage) {
    return (
      <div>
        {error && loading === false && (
          <ErrorMessage message={error?.message || "Error de servidor"} />
        )}
        <Table
          columns={DataColumns}
          data={inventarioData}
          rowsPerPageOptions={[3, 5, 10, 15, 20]}
          initialRowsPerPage={10}
          onAdd={handleAdd}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchable={true}
          searchKeys={["clasificacion","titulo", "codigo", "ubicacion"]}
          emptyMessage="No hay documentos registrados en este momento."
        />
      </div>
    );
  }

  return (
    <div className="pageContent">
      <Outlet />
    </div>
  );
};

export default InventarioDocumental;
