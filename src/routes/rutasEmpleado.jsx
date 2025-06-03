// Página de Empleados (y sus sub-páginas)
import Empleados from "../private_pages/Empleados/Empleados";
import SubPaginaListado from "../private_pages/Empleados/SubPaginaListado";
import SubPaginaDetallesEmpleado from "../private_pages/Empleados/SubPaginaDetallesEmpleado";
import SubPaginaAgregarEmpleado from "../private_pages/Empleados/SubPaginaAgregarEmpleado";
import SubPaginaEditarEmpleado from "../private_pages/Empleados/SubPaginaEditarEmpleado";
import SubPaginaReportesEmpleado from "../private_pages/Empleados/SubPaginaReportes";

export default {
  path: "/empleados",
  element: <Empleados />,
  children: [
    {
      index: true,
      path: "listado",
      element: <SubPaginaListado />,
    },
    {
      path: "reportes",
      element: <SubPaginaReportesEmpleado />,
    },
    {
      path: "detalles/:empleadoId",
      element: <SubPaginaDetallesEmpleado />,
    },
    {
      path: "agregar",
      element: <SubPaginaAgregarEmpleado />,
    },
    {
      path: "editar/:empleadoId",
      element: <SubPaginaEditarEmpleado />,
    },
  ],
};
