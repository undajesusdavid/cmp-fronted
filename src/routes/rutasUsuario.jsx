// Página de Usuarios (Ahora un componente padre para sus sub-rutas)
import Usuarios from "../private_pages/Usuarios/Usuarios";
// Sub-páginas de Usuarios
import ListadoUsuarios from "../private_pages/Usuarios/ListadoUsuarios";
import SubPaginaRoles from "../private_pages/Usuarios/SubPaginaRoles";
import SubPaginaPermisos from "../private_pages/Usuarios/SubPaginaPermisos";
import RegistroUsuario from "../private_pages/Usuarios/RegistroUsuario";

const titleModule = "Gestión de Usuarios";

export default {
  path: "/usuarios",
  element: <Usuarios />,
  children: [
    {
      path: "listado",
      element: <ListadoUsuarios />,
      handle: {
        title: "Listado de Usuarios",
        description: "",
        crumbLabel: "Listado", // Etiqueta para el breadcrumb de esta ruta
      },
    },
    {
      path: "registrar",
      element: <RegistroUsuario />,
      handle: {
        title: titleModule,
        description: "",
        crumbLabel: "Agregar", // Etiqueta para el breadcrumb de esta ruta
      },
    },
    {
      path: "roles",
      element: <SubPaginaRoles />,
      handle: {
        title: "Gestión de Roles",
        description: "",
        crumbLabel: "Roles", // Etiqueta para el breadcrumb de esta ruta
      },
    },
    {
      path: "permisos",
      element: <SubPaginaPermisos />,
      handle: {
        title: "Gestión de Permisos",
        description: "",
        crumbLabel: "Permisos", // Etiqueta para el breadcrumb de esta ruta
      },
    },
  ],
  handle: {
    title: titleModule,
    description: "",
    crumbLabel: "Usuarios", // Etiqueta para el breadcrumb de esta ruta
  },
};
