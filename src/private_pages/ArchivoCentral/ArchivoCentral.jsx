// src/private_pages/ArchivoCentral/ArchivoCentral.jsx

import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import SubMenu from "../../components/SubMenu/SubMenu"; // <-- Importa el componente genérico
import styles from "./ArchivoCentral.module.css";
import { FaBoxes, FaDownload, FaUndo, FaUpload } from "react-icons/fa";

const ArchivoCentral = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define las opciones específicas para el submenú de Archivo Central
  const archivoCentralSubMenuItems = [
    { path: "inventario", label: "Inventario Documental", icon: <FaBoxes /> }, // O FaBoxOpen, FaClipboardList, etc.
    { path: "entrada", label: "Entrada", icon: <FaDownload /> }, // O FaArrowCircleDown, etc.
    { path: "salida", label: "Salida", icon: <FaUpload /> }, // O FaArrowCircleUp, etc.
    { path: "devoluciones", label: "Devoluciones", icon: <FaUndo /> }, // O FaExchangeAlt, etc.
  ];

  // Redirige a la subpágina por defecto si se accede a /archivo-central directamente
  // Si Archivo Central tiene una página "resumen" por defecto, puedes cambiar 'documentos'
  useEffect(() => {
    if (
      location.pathname === "/archivo-central" ||
      location.pathname === "/archivo-central/"
    ) {
      navigate("/archivo-central/inventario", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <div className={styles.pageContent}>
      <h1>📦 Archivo Central</h1>
      <p>
        Aquí puedes gestionar los documentos y archivos centrales de la empresa.
      </p>

      {/* Usamos el componente SubMenu genérico, pasándole las opciones */}
      <SubMenu items={archivoCentralSubMenuItems} />

      {/* Área donde se renderizarán las sub-páginas */}
      <div className={styles.subPageContentArea}>
        <Outlet />
      </div>
    </div>
  );
};

export default ArchivoCentral;
