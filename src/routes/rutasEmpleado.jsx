// Página de Empleados (y sus sub-páginas)
import Empleados from "../private_pages/Empleados/Empleados";
import HomeEmpleados from "../private_pages/Empleados/HomeEmpleados";
import ListadoEmpleados from "../private_pages/Empleados/ListadoEmpleados";
import RegistrarEmpleado from "../private_pages/Empleados/ListadoEmpleados/RegistrarEmpleado";
import DetalleEmpleado from "../private_pages/Empleados/ListadoEmpleados/DetalleEmpleado";
import EditarEmpleado from "../private_pages/Empleados/ListadoEmpleados/EditarEmpleado";
import ReporteEmpleados from "../private_pages/Empleados/ReporteEmpleados";

const titleModule = "Gestión de Empleados";

export default {
  path: "/empleados",
  element: <Empleados />,
  handle: {
    title: titleModule,
    description: "",
    crumbLabel: "Empleados",
  },
  children: [
    {
      index: true,
      element: <HomeEmpleados />,
      handle: {
        title: titleModule,
        description: "",
        //crumbLabel: "",
      },
    },
    {
      path: "listado",
      element: <ListadoEmpleados />,
      handle: {
        title: "Listado de Empleados",
        description: "",
        crumbLabel: "Listado",
      },
      children: [
        {
          path: "detalle/:empleadoId",
          element: <DetalleEmpleado />,
          handle: {
            title: "Datos del Empleado",
            description: "",
            crumbLabel: "Detalle",
          },
        },
        {
          path: "agregar",
          element: <RegistrarEmpleado />,
          handle: {
            title: "Registro de Empleado",
            description: "",
            crumbLabel: "Registrar",
          },
        },
        {
          path: "editar/:empleadoId",
          element: <EditarEmpleado />,
          handle: {
            title: "Ediciòn de Empleado",
            description: "",
            crumbLabel: "Editar",
          },
        },
      ],
    },
    {
      path: "reportes",
      element: <ReporteEmpleados />,
      handle: {
        title: "Reportes de Empleado",
        description: "",
        crumbLabel: "Reportes",
      },
    },
  ],
};
