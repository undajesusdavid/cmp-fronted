import ArchivoCentral from "../private_pages/ArchivoCentral/ArchivoCentralLayout";
import HomeArchivoCentral from "../private_pages/ArchivoCentral/HomeArchivoCentral";
import SubPaginaDevoluciones from "../private_pages/ArchivoCentral/SubPaginaDevoluciones";
import SubPaginaEntrada from "../private_pages/ArchivoCentral/SubPaginaEntrada";
import SubPaginaSalida from "../private_pages/ArchivoCentral/SubPaginaSalida";
import SubPaginaInventarioArchivo from "../private_pages/ArchivoCentral/SubPaginaInventario";

const titleModule = "Gestión de Archivos";

export default {
  path: "archivo-central",
  element: <ArchivoCentral />,
  handle: {
    title: titleModule,
    description: "",
    crumbLabel: "Archivo Central",
  },
  children: [
    {
      index: true,
      element: <HomeArchivoCentral />,
      handle: {
        title: titleModule,
        description: "",
        crumbLabel: "",
      },
    },
    {
      path: "inventario",
      element: <SubPaginaInventarioArchivo />,
      handle: {
        title: "Inventario Documental",
        description: "",
        crumbLabel: "Inventario",
      },
    },
    {
      path: "entrada",
      element: <SubPaginaEntrada />,
      handle: {
        title: "Entrada de Documentos",
        description: "",
        crumbLabel: "Entrada",
      },
    },
    {
      path: "salida",
      element: <SubPaginaSalida />,
      handle: {
        title: "Salida de Documentos",
        description: "",
        crumbLabel: "Salida",
      },
    },
    {
      path: "devoluciones",
      element: <SubPaginaDevoluciones />,
      handle: {
        title: "Devoluciones de Documentos",
        description: "",
        crumbLabel: "Devoluciones",
      },
    },
  ],
};
