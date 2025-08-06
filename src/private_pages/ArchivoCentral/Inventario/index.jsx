import Table from "../../../components/Table/Table";
import "../../stylesPrivatePages.css";
import { useEffect, useState } from "react";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import { getAllInventory } from "../../../api/CentralArchive/InventoryController";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const InventarioDocumental = () => {
  const navigate = useNavigate();
  const inCurrentPage = useMatch("/archivo-central/inventario");
  const [loading, setLoading] = useState(false);
  const [inventarioData, setInventarioData] = useState([]);

  const handleGetList = async () => {
    setLoading(true);
    const inventory = await getAllInventory();
    setInventarioData(inventory);
    setLoading(false);
  };

  useEffect(() => {
    if (inCurrentPage) handleGetList();
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
            <p style={{fontWeight: "bold"}}>{row.clasificacion.serie}</p>
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
    return <LoadingSpinner />;
  }

  if (inCurrentPage) {
    return (
      <div>
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
          searchKeys={["titulo", "codigo", "ubicacion"]}
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
