// src/private_pages/ArchivoCentral/SubPaginaDocumentos.jsx
import React from "react";
import styles from "./SubPaginaDocumentos.module.css";

const SubPaginaDocumentos = () => {
  return (
    <div className={styles.subPageContent}>
      <h2>📁 Todos los Documentos</h2>
      <p>
        Aquí se listarán y gestionarán todos los documentos del archivo central.
      </p>
      <ul>
        <li>Factura_001.pdf</li>
        <li>Contrato_Servicios_ABC.docx</li>
        <li>Informe_Anual_2023.xlsx</li>
      </ul>
    </div>
  );
};

export default SubPaginaDocumentos;
