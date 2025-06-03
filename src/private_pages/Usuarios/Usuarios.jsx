import "../stylesPrivatePages.css";
import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import SubMenu from "../../components/SubMenu/SubMenu";
import styles from "./Usuarios.module.css";

const Usuarios = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const usuariosSubMenuItems = [
    { label: "Listado", path: "listado", icon: "⚙️" },
    { label: "Roles", path: "roles", icon: "🛡️" },
    { label: "Permisos", path: "permisos", icon: "🔑" }
  ];

  useEffect(() => {
    if (
      location.pathname === "/usuarios" ||
      location.pathname === "/usuarios/"
    ) {
      navigate("/usuarios/listado", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <div className="pageContent">
      <SubMenu items={usuariosSubMenuItems} />
      <div className={styles.subPageContentArea}>
        <Outlet />
      </div>
    </div>
  );
};

export default Usuarios;
