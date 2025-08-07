import ArchivoCentral from "../private_pages/ArchivoCentral/ArchivoCentralLayout";
import HomeArchivoCentral from "../private_pages/ArchivoCentral/Home/HomeArchivoCentral";
import InventarioDocumental from "../private_pages/ArchivoCentral/Inventario";

import ListadoClasificacion from "../private_pages/ArchivoCentral/Clasificacion/ListadoClasificacion";
import RegistrarClasificacion from "../private_pages/ArchivoCentral/Clasificacion/RegistrarClasificacion";
import EditarClasificacion from "../private_pages/ArchivoCentral/Clasificacion/EditarClasificacion";

import DetalleDocumento from "../private_pages/ArchivoCentral/Inventario/DetalleDocumento";
import RegistrarDocumento from "../private_pages/ArchivoCentral/Inventario/RegistrarDocumento";

import SubPaginaDevoluciones from "../private_pages/ArchivoCentral/Devoluciones";
import SubPaginaEntrada from "../private_pages/ArchivoCentral/Entradas";
import SubPaginaSalida from "../private_pages/ArchivoCentral/Salidas";

import ExpedienteModule from "../private_pages/ArchivoCentral/Expediente";
import ContenedorModule from "../private_pages/ArchivoCentral/Contenedor";

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
      path: "clasificacion",
      element: <ListadoClasificacion />,
      handle: {
        title: "Clasificación de Documentos",
        description: "",
        crumbLabel: "Clasificación",
      },
      children: [
        {
          path: "registrar",
          element: <RegistrarClasificacion />,
          handle: {
            title: "Registrar Clasificación",
            description: "",
            crumbLabel: "Registrar clasificación",
          },
        },
        {
          path: "editar/:itemId",
          element: <EditarClasificacion />,
          handle: {
            title: "Editar Clasificación",
            description: "",
            crumbLabel: "Editar Clasificación",
          },
        },
      ],
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
    {
      path: "expedientes",
      element: <ExpedienteModule />,
      handle: {
        title: "Expedientes",
        description: "",
        crumbLabel: "Expedientes",
      },
    },
    {
      path: "contenedores",
      element: <ContenedorModule />,
      handle: {
        title: "Contenedores",
        description: "",
        crumbLabel: "Contenedores",
      },
    },
  ],
};
