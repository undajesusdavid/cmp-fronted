// src/components/SectionHeader/SectionHeader.jsx

import React from "react";
import styles from "./SectionHeader.module.css";

/**
 * Componente para el encabezado de una sección, mostrando el título y una descripción.
 * Ideal para usar al inicio de cada página o sección principal.
 *
 * @param {object} props
 * @param {string} props.title - El título principal de la sección.
 * @param {string} [props.description] - Una pequeña descripción o subtítulo de la sección. (Opcional)
 * @param {React.ReactNode} [props.children] - Cualquier elemento React adicional que se desee renderizar
 * dentro del header (ej. un botón, un buscador, etc.). (Opcional)
 */
const SectionHeader = ({ title, description, children }) => {
  return (
    <div className={styles.sectionHeaderContainer}>
      <div className={styles.textContainer}>
        <h1 className={styles.sectionTitle}>{title}</h1>
        {description && (
          <p className={styles.sectionDescription}>{description}</p>
        )}
      </div>
      {children && <div className={styles.extraContent}>{children}</div>}
    </div>
  );
};

export default SectionHeader;
