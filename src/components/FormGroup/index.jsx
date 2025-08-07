import React, { useState } from "react";
import styles from "./FormGroup.module.css";

const FormGroup = ({ direction = "vertical", wrap = false, className = "", title, children, collapsible = false, defaultCollapsed = false, ...props }) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const groupClass = [
    styles.formGroup,
    direction === "horizontal" ? styles.horizontal : styles.vertical,
    wrap && direction === "horizontal" ? styles.wrap : "",
    className
  ].join(" ").trim();

  const handleTitleClick = () => {
    if (collapsible) setCollapsed((c) => !c);
  };

  return (
    <div className={groupClass} {...props}>
      {title && (
        <div
          className={styles.groupTitle}
          style={{marginBottom: '1.2rem', marginTop: '-0.2rem', cursor: collapsible ? 'pointer' : 'default'}}
          onClick={handleTitleClick}
          aria-label={collapsible ? (collapsed ? "Expandir sección" : "Colapsar sección") : undefined}
        >
          {title}
          {collapsible && (
            <button
              type="button"
              className={styles.collapseBtn}
              tabIndex={-1}
              style={{pointerEvents: 'none', background: 'none', border: 'none'}}
            >
              <span className={collapsed ? styles.iconCollapsed : styles.iconExpanded}>▼</span>
            </button>
          )}
        </div>
      )}
      <div
        className={styles.groupContent}
        style={{
          maxHeight: collapsible ? (collapsed ? "0" : "2000px") : undefined,
          overflow: collapsible ? "hidden" : undefined,
          transition: collapsible ? "max-height 0.35s cubic-bezier(.4,0,.2,1)" : undefined,
          opacity: collapsible ? (collapsed ? 0 : 1) : 1,
        }}
        aria-hidden={collapsible ? collapsed : undefined}
      >
        {children}
      </div>
    </div>
  );
};

export default FormGroup;
