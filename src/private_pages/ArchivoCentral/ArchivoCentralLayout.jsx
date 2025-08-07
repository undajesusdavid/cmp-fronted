import "../stylesPrivatePages.css";
import styles from "./ArchivoCentral.module.css";
import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FaListAlt,
  FaFolderOpen,
  FaBookOpen,
  FaSignInAlt,
  FaSignOutAlt,
  FaRetweet,
} from "react-icons/fa";

import { GoContainer } from "react-icons/go";
import SubMenu from "../../components/SubMenu/SubMenu";

const ArchivoCentral = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const archivoCentralSubMenuItems = [
    { path: "clasificacion", label: "Clasificación", icon: <FaListAlt /> },
    { path: "expedientes", label: "Expedientes", icon: <FaFolderOpen /> },
    { path: "contenedores", label: "Contenedores", icon: <GoContainer /> },
    { path: "inventario", label: "Elementos Archivados", icon: <FaBookOpen /> },
    { path: "entrada", label: "Entradas", icon: <FaSignInAlt /> },
    { path: "salida", label: "Salidas", icon: <FaSignOutAlt /> },
    { path: "devoluciones", label: "Devoluciones", icon: <FaRetweet /> },
  ];

  useEffect(() => {
    if (
      location.pathname === "/archivo-central" ||
      location.pathname === "/archivo-central/"
    ) {
      //navigate("/archivo-central/inventario", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <div className="pageContent">
      <SubMenu items={archivoCentralSubMenuItems} />
      <div className={styles.subPageContentArea}>
        <Outlet />
      </div>
    </div>
  );
};

export default ArchivoCentral;
