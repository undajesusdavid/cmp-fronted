import styles from "./SectionHeader.module.css";

const SectionHeader = ({ title, description, breadcrumbs }) => {
  return (
    <header className={styles.sectionHeader}>
      <h1 className={styles.sectionHeader__title}>{title}</h1>
      {description && ( // Renderiza la descripción solo si existe
        <p className={styles.sectionHeader__description}>{description}</p>
      )}
    </header>
  );
};

export default SectionHeader;
