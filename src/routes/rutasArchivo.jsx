import ArchivoCentral from "../private_pages/ArchivoCentral/ArchivoCentralLayout";
import HomeArchivoCentral from "../private_pages/ArchivoCentral/Home/HomeArchivoCentral";
import InventarioDocumental from "../private_pages/ArchivoCentral/ElementoArchivado";

import ListadoClasificacion from "../private_pages/ArchivoCentral/Clasificacion/ListadoClasificacion";
import RegistrarClasificacion from "../private_pages/ArchivoCentral/Clasificacion/RegistrarClasificacion";
import EditarClasificacion from "../private_pages/ArchivoCentral/Clasificacion/EditarClasificacion";

import DetalleElementoArchivado from "../private_pages/ArchivoCentral/ElementoArchivado/DetalleElementoArchivado";
import RegistrarElementoArchivado from "../private_pages/ArchivoCentral/ElementoArchivado/RegistrarElementoArchivado";
import EditarElementoArchivado from "../private_pages/ArchivoCentral/ElementoArchivado/EditarElementoArchivado";

import SubPaginaDevoluciones from "../private_pages/ArchivoCentral/Devoluciones";
import SubPaginaEntrada from "../private_pages/ArchivoCentral/Entradas";
import SubPaginaSalida from "../private_pages/ArchivoCentral/Salidas";

import ExpedienteModule from "../private_pages/ArchivoCentral/Expediente";
import ContenedorModule from "../private_pages/ArchivoCentral/Contenedor";
import RegistrarContenedor from "../private_pages/ArchivoCentral/Contenedor/RegistrarContenedor";
import DetalleContenedor from "../private_pages/ArchivoCentral/Contenedor/DetalleContenedor";
import EditarContenedor from "../private_pages/ArchivoCentral/Contenedor/EditarContenedor";
import RegistrarExpediente from "../private_pages/ArchivoCentral/Expediente/RegistrarExpediente";
import DetalleExpediente from "../private_pages/ArchivoCentral/Expediente/DetalleExpediente";
import EditarExpediente from "../private_pages/ArchivoCentral/Expediente/EditarExpediente";
import DetalleClasificacion from "../private_pages/ArchivoCentral/Clasificacion/DetalleClasificacion";


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
          path: "agregar",
          element: <RegistrarClasificacion />,
          handle: {
            title: "Registrar Clasificación",
            description: "",
            crumbLabel: "Registrar clasificación",
          },
        },
        {
          path: "detalle/:id",
          element: <DetalleClasificacion />,
          handle: {
            title: "Detalle de Clasificación",
            description: "",
            crumbLabel: "Detalle de Clasificación",
          },
        },
        {
          path: "editar/:id",
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
      path: "elementos",
      element: <InventarioDocumental />,
      handle: {
        title: "Elementos Archivados",
        description: "",
        crumbLabel: "Elementos Archivados",
      },
      children: [
        {
          path: "agregar",
          element: <RegistrarElementoArchivado />,
          handle: {
            title: "Registro de Documentos",
            description: "",
            crumbLabel: "Registrar",
          },
        },
        {
          path: "detalle/:itemId",
          element: <DetalleElementoArchivado />,
          handle: {
            title: "Detalle de Archivo",
            description: "",
            crumbLabel: "Detalle",
          },
        },
        {
          path: "editar/:id",
          element: <EditarElementoArchivado />,
          handle: {
            title: "Editar Elemento Archivado",
            description: "",
            crumbLabel: "Editar elemento",
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
      children: [
        {
          path: "agregar",
          element: <RegistrarExpediente />,
          handle: {
            title: "Registrar Expediente",
            description: "",
            crumbLabel: "Registrar Expediente",
          },
        },
        {
          path: "detalle/:id",
          element: <DetalleExpediente />,
          handle: {
            title: "Información de Expediente",
            description: "",
            crumbLabel: "Detalle Expediente",
          },
        },
        {
          path: "editar/:id",
          element: <EditarExpediente />,
          handle: {
            title: "Editar Expediente",
            description: "",
            crumbLabel: "Editar Expediente",
          },
        },
      ],
    },
    {
      path: "contenedores",
      element: <ContenedorModule />,
      handle: {
        title: "Contenedores",
        description: "",
        crumbLabel: "Contenedores",
      },
      children: [
        {
          path: "agregar",
          element: <RegistrarContenedor />,
          handle: {
            title: "Registrar Contenedor",
            description: "",
            crumbLabel: "Registrar",
          },
        },
        {
          path: "editar/:id",
          element: <EditarContenedor />,
          handle: {
            title: "Editar Contenedor",
            description: "",
            crumbLabel: "Editar Contenedor",
          },
        },
        {
          path: "detalle/:id",
          element: <DetalleContenedor />,
          handle: {
            title: "Información del Contenedor",
            description: "",
            crumbLabel: "Detalle de Contenedor",
          },
        },
      ],
    },
  ],
};
