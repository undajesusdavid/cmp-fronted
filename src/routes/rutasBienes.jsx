import Bienes from "../private_pages/Bienes/Bienes"; //Pagina con Outlet
import HomeBienes from "../private_pages/Bienes/Home";

//Reportes de Bienes
import ReporteBienes from "../private_pages/Bienes/Reportes";

//Inventario de Bienes
import InventarioBienes from "../private_pages/Bienes/Inventario";
import FormRegistrarBien from "../private_pages/Bienes/Inventario/FormRegistrarBien";

const titleModule = "Gestión de Bienes";

export default {
  path: "/bienes",
  element: <Bienes />,
  handle: {
    title: titleModule,
    description: "",
    crumbLabel: "Bienes",
  },
  children: [
    {
      index: true,
      element: <HomeBienes />,
      handle: {
        title: titleModule,
        description: "",
        //crumbLabel: "",
      },
    },
    {
      path: "inventario",
      element: <InventarioBienes />,
      handle: {
        title: "Inventario de Bienes",
        description: "",
        crumbLabel: "Inventario",
      },
      children: [
        {
          path: "agregar",
          element: <FormRegistrarBien />,
          handle: {
            title: "Registro de Item",
            description: "",
            crumbLabel: "Registrar Item",
          },
        },
      ],
    },

    {
      path: "reportes",
      element: <ReporteBienes />,
      handle: {
        title: "Reportes de Bienes",
        description: "",
        crumbLabel: "Reportes",
      },
    },
  ],
};
