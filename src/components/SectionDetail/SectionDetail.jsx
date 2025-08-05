import { useState } from "react";
import styles from "./SectionDetail.module.css";

const SectionDetail = ({ children, label }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => setIsOpen((prev) => !prev);

  return (
    <div className={styles.sectionsContainer}>
      <section className={styles.detailSection}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3>{label}</h3>
          <button
            onClick={handleToggle}
            className={styles.toggleButton}
            aria-label={isOpen ? "Ocultar" : "Mostrar"}
          >
            {isOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12L10 7L15 12" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 8L10 13L15 8" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>
        {isOpen && (
          <div className={styles.detailGrid}>
            {children}
          </div>
        )}
      </section>
    </div>
  );
};

export default SectionDetail;