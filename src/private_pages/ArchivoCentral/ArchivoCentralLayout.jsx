
import "../stylesPrivatePages.css";
import styles from "./ArchivoCentral.module.css";
import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { FaBoxes, FaDownload, FaUndo, FaUpload } from "react-icons/fa";
import SubMenu from "../../components/SubMenu/SubMenu";

const ArchivoCentral = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const archivoCentralSubMenuItems = [
    { path: "inventario", label: "Inventario Documental", icon: <FaBoxes /> }, 
    { path: "entrada", label: "Entrada", icon: <FaDownload /> }, 
    { path: "salida", label: "Salida", icon: <FaUpload /> }, 
    { path: "devoluciones", label: "Devoluciones", icon: <FaUndo /> },
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
