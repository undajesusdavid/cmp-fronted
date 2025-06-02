// src/components/SubMenu/SubMenu.jsx

import { NavLink } from "react-router-dom";
import styles from "./SubMenu.module.css";

// Ejemplo de importación de íconos para SubMenu
// Elige los que mejor se adapten a cada opción de tu menú
import {
  FiList, // Por ejemplo, para "Ver Todos"
  FiPlusCircle, // Para "Añadir Nuevo"
  FiFilter, // Para "Filtrar"
  FiEdit2, // Para "Editar"
  FiTrash2, // Para "Eliminar" (si es una acción de menú)
  FiSearch, // Para "Buscar"
} from "react-icons/fi"; // Puedes elegir de otras colecciones también

/**
 * Componente de Submenú Horizontal Reutilizable.
 *
 * @param {object} props
 * @param {Array<Object>} props.items - Un array de objetos, donde cada objeto
 * representa una opción del menú y debe tener:
 * - {string} label: El texto a mostrar en el enlace.
 * - {string} path: La ruta a la que apunta el enlace (relativa al padre).
 * - {React.Component} [icon]: (Opcional) Un componente de React Icon (ej. <FiHome />).
 */
const SubMenu = ({ items }) => {
  return (
    <nav className={styles.subMenuContainer}>
      <ul className={styles.subMenuList}>
        {items.map((item) => (
          <li key={item.path} className={styles.subMenuItem}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? `${styles.subMenuLink} ${styles.activeSubMenuLink}`
                  : styles.subMenuLink
              }
              end={item.end} // Usa 'end' para que coincida exactamente con la ruta base si es necesario
            >
              {/* Renderiza el componente de ícono si se proporciona */}
              {item.icon && (
                <span className={styles.subMenuIcon}>{item.icon}</span>
              )}
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SubMenu;

// --- Cómo usar este SubMenu ---
// En el componente padre (ej. Dashboard, Archivo Central, etc.):

/*
import SubMenu from '../components/SubMenu/SubMenu';
import { FiList, FiPlusCircle } from 'react-icons/fi'; // Importa los íconos que necesites

const DashboardPage = () => {
  const dashboardSubMenuItems = [
    { label: 'Visión General', path: '/dashboard', icon: <FiList />, end: true },
    { label: 'Reportes', path: '/dashboard/reportes', icon: <FiPlusCircle /> },
    { label: 'Alertas', path: '/dashboard/alertas', icon: <FiFilter /> },
  ];

  return (
    <div>
      <h2>Página de Dashboard</h2>
      <SubMenu items={dashboardSubMenuItems} />
      // ... Contenido del dashboard ...
    </div>
  );
};

export default DashboardPage;
*/
