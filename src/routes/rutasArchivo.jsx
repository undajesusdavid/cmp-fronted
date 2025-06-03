import ArchivoCentral from "../private_pages/ArchivoCentral/ArchivoCentral";
import SubPaginaDevoluciones from "../private_pages/ArchivoCentral/SubPaginaDevoluciones";
import SubPaginaEntrada from "../private_pages/ArchivoCentral/SubPaginaEntrada";
import SubPaginaSalida from "../private_pages/ArchivoCentral/SubPaginaSalida";
import SubPaginaInventarioArchivo from "../private_pages/ArchivoCentral/SubPaginaInventario";

export default {
  path: "/archivo-central",
  element: <ArchivoCentral />,
  children: [
    {
      index: true, // Ruta por defecto para /archivo-central
      element: <SubPaginaEntrada />,
    },
    {
      path: "entrada",
      element: <SubPaginaEntrada />,
    },
    {
      path: "salida",
      element: <SubPaginaSalida />,
    },
    {
      path: "devoluciones",
      element: <SubPaginaDevoluciones />,
    },
    {
      path: "inventario",
      element: <SubPaginaInventarioArchivo />,
    },
  ],
};
