import "../stylesPrivatePages.css";
import styles from "./ArchivoCentral.module.css";
import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { FaBoxes, FaDownload, FaUndo, FaUpload, FaListAlt, FaArchive, FaSignInAlt, FaSignOutAlt, FaRetweet } from "react-icons/fa";
import SubMenu from "../../components/SubMenu/SubMenu";

const ArchivoCentral = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const archivoCentralSubMenuItems = [
    { path: "clasificacion", label: "Clasificación", icon: <FaListAlt /> },
    { path: "inventario", label: "Inventario Documental", icon: <FaArchive /> }, 
    { path: "entrada", label: "Entrada", icon: <FaSignInAlt /> }, 
    { path: "salida", label: "Salida", icon: <FaSignOutAlt /> }, 
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
