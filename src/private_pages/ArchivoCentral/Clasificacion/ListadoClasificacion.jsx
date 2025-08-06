import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useMatch, useNavigate } from "react-router-dom";
import Table from "../../../components/Table/Table";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { getClasificaciones } from "../../../api/CentralArchive/ClasificacionController";

const ListadoClasificacion = () => {
  const inCurrentPage = useMatch("/archivo-central/clasificacion");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    const result = await getClasificaciones();
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    let firstLoad = true;
    if (inCurrentPage && firstLoad) {
      fetchData();
      firstLoad = false;
    }
    return () => { firstLoad = true; }
  }, [inCurrentPage]);

  const columns = [
    {
      key: "departamento_nombre",
      header: "Departamento",
      align: "center",
      render: (row) => row.departamento.nomenclatura || "N/A",
    },
    { key: "cod_serie", header: "Código Serie", align: "center" },
    { key: "cod_subserie", header: "Código Subserie", align: "center" },
    { key: "serie", header: "Serie", align: "center" },
    { key: "subserie", header: "Subserie", align: "center" },
  ];

  const handleView = (row) => {
    // Implementa la navegación o acción de ver detalle aquí
    alert(`Ver detalle de: ${row.cod_serie} - ${row.serie}`);
  };

  const handleEdit = (row) => {
    // Implementa la navegación o acción de editar aquí
    navigate("/archivo-central/clasificacion/editar/" + row.id);
  };

  const handleDelete = (row) => {
    // Implementa la lógica de eliminación aquí
    if (
      window.confirm(
        `¿Seguro que deseas eliminar la clasificación ${row.cod_serie}?`
      )
    ) {
      // Lógica de eliminación
      alert("Eliminado (simulado)");
    }
  };

  const handleAdd = () => {
    navigate("/archivo-central/clasificacion/registrar");
  };

  if (loading) return <LoadingSpinner />;

  if (inCurrentPage) {
    return (
      <div>
        <Table
          columns={columns}
          data={data}
          rowsPerPageOptions={[5, 10, 20]}
          initialRowsPerPage={10}
          searchable={true}
          searchKeys={[
            "cod_serie",
            "cod_subserie",
            "serie",
            "subserie",
            "departamento_nombre",
          ]}
          emptyMessage="No hay clasificaciones registradas."
          onAdd={handleAdd}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
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

export default ListadoClasificacion;
