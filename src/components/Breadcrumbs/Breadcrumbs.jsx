import React from "react";
import styles from "./Breadcrumbs.module.css";
import { Link } from "react-router-dom"; // Si estás usando React Router

const Breadcrumbs = ({ items }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav className={styles.breadcrumbs}>
      <ul className={styles.breadcrumbs__list}>
        {items.map((item, index) => (
          <li key={index} className={styles.breadcrumbs__item}>
            {item.path ? (
              // Si usas React Router, usa <Link>
              <Link to={item.path} className={styles.breadcrumbs__link}>
                {item.label}
              </Link>
            ) : (
              // Si no, usa un <span> simple
              <span className={styles.breadcrumbs__label}>{item.label}</span>
            )}
            {index < items.length - 1 && (
              <span className={styles.breadcrumbs__separator}>/</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
