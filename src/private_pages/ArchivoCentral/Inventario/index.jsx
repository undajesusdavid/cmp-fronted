import Table from "../../../components/Table/Table";
import "../../stylesPrivatePages.css";
import { useState } from "react";
import { Outlet, useMatch, useNavigate } from "react-router-dom";

const InventarioDocumental = () => {
  const navigate = useNavigate();
    const inCurrentPage = useMatch("/archivo-central/inventario");
  const [inventarioData, setInventarioData] = useState([
    {
      cod_clasificacion: "DPI-01-01",
      nombre: "Actuación fiscal a INMUJER",
      num_acta: "DCP-01-2025",
      descripcion:
        "Actuacion de tendente a evaluar los procedimientos de control del contabilidad",
      //Detalles de piezas
      piezas: [
        {
          numero: 1,
          rang_folios: "1-250",
          ubicacion_fisica: "1A-02-01",
          ubicacion_digital: "asdb9238rr32r9813",
          contenido: "Cedulas de asignacion, Oficios de Notificación",
        },
        {
          numero: 2,
          rang_folios: "250-500",
          ubicacion_fisica: "1A-02-02",
          ubicacion_digital: "ehgf329h2gf039gh023h009g",
          contenido: "Cedulas de asignacion, Oficios de Notificación",
        },
      ],
    },
  ]);

  const handleAdd = () => navigate("agregar");
  const handleView = () => {};
  const handleEdit = () => {};
  const handleDelete = () => {};

  const DataColumns = [
    {
      key: "cod_clasificacion",
      header: "Clasificación",
      align: "center",
    },
    { key: "nombre", header: "Nombre de Tramite", align: "center" },
    {
      key: "piezas",
      header: "N° de Piezas",
      align: "center",
      render: (row) => row?.piezas.length,
    },
    { key: "num_acta", header: "N° de Acta", align: "center" },
    { key: "descripcion", header: "Descripción", align: "center" },
  ];

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
          searchKeys={["serie"]}
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
