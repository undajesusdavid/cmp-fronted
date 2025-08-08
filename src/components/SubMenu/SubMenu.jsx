import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, matchPath } from "react-router-dom";
import styles from "./SubMenu.module.css";
import { FiChevronDown } from "react-icons/fi";

const SubMenu = ({ items }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const menuRef = useRef(null);
  const basePath = location.pathname.split("/")[1];

  const handleToggle = (path) => {
    setOpenDropdown((prev) => (prev === path ? null : path));
  };

  const handleClose = () => setOpenDropdown(null);

  const isChildActive = (children, parentPath) =>
    children?.some((child) =>
      matchPath(
        {
          path: `/${basePath}/${parentPath}/${child.path}`.replace(/\/+/g, "/"),
          end: false,
        },
        location.pathname
      )
    );

  const getActiveChildLabel = (children, parentPath) => {
    const activeChild = children?.find((child) => {
      const fullPath = `/${basePath}/${parentPath}/${child.path}`.replace(
        /\/+/g,
        "/"
      );
      return matchPath({ path: fullPath, end: false }, location.pathname);
    });
    return activeChild?.label || null;
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={styles.subMenuContainer}
      aria-label="Submenú de navegación"
      ref={menuRef}
    >
      <ul className={styles.subMenuList}>
        {items.map(({ path, label, icon, children, end }) => {
          const hasChildren = Array.isArray(children) && children.length > 0;
          const isActive = isChildActive(children, path);
          

          return (
            <li key={path} className={styles.subMenuItem}>
              {hasChildren ? (
                <>
                  <button
                    type="button"
                    className={`${styles.subMenuButton} ${
                      isActive ? styles.activeSubMenuButton : ""
                    }`}
                    onClick={() => handleToggle(path)}
                    aria-expanded={openDropdown === path}
                    aria-controls={`submenu-${path}`}
                  >
                    {icon && <span className={styles.subMenuIcon}>{icon}</span>}
                    {label}
                    <span className={styles.dropdownIcon}>
                      <FiChevronDown />
                    </span>
                  </button>

                  {openDropdown === path && (
                    <ul
                      id={`submenu-${path}`}
                      className={styles.dropdownMenu}
                      role="menu"
                    >
                      {children.map(
                        ({
                          path: childPath,
                          label: childLabel,
                          icon: childIcon,
                          end: childEnd,
                        }) => {
                          const fullPath =
                            `/${basePath}/${path}/${childPath}`.replace(
                              /\/+/g,
                              "/"
                            );
                          return (
                            <li key={childPath} className={styles.dropdownItem}>
                              <NavLink
                                to={fullPath}
                                className={({ isActive }) =>
                                  isActive
                                    ? `${styles.dropdownLink} ${styles.activeDropdownLink}`
                                    : styles.dropdownLink
                                }
                                end={childEnd}
                                onClick={handleClose}
                                role="menuitem"
                              >
                                {childIcon && (
                                  <span className={styles.subMenuIcon}>
                                    {childIcon}
                                  </span>
                                )}
                                {childLabel}
                              </NavLink>
                            </li>
                          );
                        }
                      )}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink
                  to={`/${basePath}/${path}`}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.subMenuLink} ${styles.activeSubMenuLink}`
                      : styles.subMenuLink
                  }
                  end={end}
                >
                  {icon && <span className={styles.subMenuIcon}>{icon}</span>}
                  {label}
                </NavLink>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SubMenu;
