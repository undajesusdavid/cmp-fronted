import ArchivoCentral from "../private_pages/ArchivoCentral/ArchivoCentralLayout";
import HomeArchivoCentral from "../private_pages/ArchivoCentral/HomeArchivoCentral";
import InventarioDocumental from "../private_pages/ArchivoCentral/Inventario";
import DetalleDocumento from "../private_pages/ArchivoCentral/Inventario/DetalleDocumento";
import RegistrarDocumento from "../private_pages/ArchivoCentral/Inventario/RegistrarDocumento";

import SubPaginaDevoluciones from "../private_pages/ArchivoCentral/SubPaginaDevoluciones";
import SubPaginaEntrada from "../private_pages/ArchivoCentral/SubPaginaEntrada";
import SubPaginaSalida from "../private_pages/ArchivoCentral/SubPaginaSalida";
//import SubPaginaInventarioArchivo from "../private_pages/ArchivoCentral/SubPaginaInventario";

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
      element: <InventarioDocumental />,
      handle: {
        title: "Inventario Documental",
        description: "",
        crumbLabel: "Inventario",
      },
      children: [
        {
          path: "agregar",
          element: <RegistrarDocumento />,
          handle: {
            title: "Registro de Documentos",
            description: "",
            crumbLabel: "Registrar",
          },
        },
        {
          path: "detalle/:itemId",
          element: <DetalleDocumento />,
          handle: {
            title: "Detalle de Archivo",
            description: "",
            crumbLabel: "Detalle",
          },
        },
      ],
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
