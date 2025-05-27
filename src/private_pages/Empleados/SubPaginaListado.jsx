// src/private_pages/Empleados/SubPaginaListado.jsx

import React, {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table/Table";
import empleadosInicialesData from "../../data/empleadosData";
import styles from "./SubPaginaListado.module.css";
import {getAllEmployees} from "../../api/Employees/EmployeeController";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const SubPaginaListado = () => {
  const navigate = useNavigate();
  const [empleadosData, setEmpleadosData] = useState(empleadosInicialesData);
  const [loading, setLoading] = useState(false);
  
  const handleGetList = async() => {
    setLoading(true);
    const employees = await getAllEmployees();
    setEmpleadosData(employees);
    setLoading(false);
  };

  useEffect(() => {
    handleGetList();
  },[])

  const handleView = (rowData) => {
    navigate(`/empleados/detalles/${rowData.id}`);
  };
  const handleEdit = (rowData) => {
    // AHORA NAVEGAMOS A LA PÁGINA DE EDICIÓN
    navigate(`/empleados/editar/${rowData.id}`);
  };

  const handleAdd = () => {
    navigate("/empleados/agregar");
  };

  const handleDelete = (rowData) => {
    if (
      window.confirm(
        `¿Estás seguro de que quieres eliminar a ${rowData.nombre}?`
      )
    ) {
      const nuevosEmpleados = empleadosData.filter(
        (emp) => emp.id !== rowData.id
      );
      setEmpleadosData(nuevosEmpleados);
      alert(`${empleadoNombre} ha sido eliminado.`);
      console.log("Empleado eliminado con ID:", rowData.id);
    }
  };

  const empleadosColumns = [
    { key: "cedula", header: "Cédula", align: "center" },
    {
      key: "nombre_completo",
      header: "Nombre Completo",
      render: (rowData) => `${rowData.nombre} ${rowData.apellido}`,
    },
    {
      key: "cargo_nombre",
      header: "Cargo",
      render: (rowData) => rowData.cargo?.nombre || "N/A",
    },
    {
      key: "departamento_nombre",
      header: "Departamento",
      render: (rowData) => rowData.departamento?.nombre || "N/A",
    },
  ];

  if(loading){
    return <LoadingSpinner />
  }

  return (
    <div className={styles.subPageContent}>
      <h2>👥 Listado de Personal</h2>
      <p>
        Aquí puedes consultar y gestionar el listado completo de todos los
        empleados de la empresa.
      </p>

      <Table
        data={empleadosData}
        columns={empleadosColumns}
        rowsPerPageOptions={[3, 5, 10, 15, 20]} // Ejemplo de opciones personalizadas
        initialRowsPerPage={10} // Ejemplo de un valor inicial diferente
        onAdd={handleAdd}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchable={true} // Habilita el buscador
        searchKeys={["cedula", "nombre"]} // Opcional: Define las claves para buscar
        emptyMessage="No hay empleados registrados en este momento."
      />
    </div>
  );
};

export default SubPaginaListado;
