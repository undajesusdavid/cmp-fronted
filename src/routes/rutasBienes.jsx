
import Bienes from "../private_pages/Bienes/Bienes"; //Pagina con Outlet
import SubPaginaInventario from "../private_pages/Bienes/SubPaginaInventario";
import SubPaginaReportesBienes from "../private_pages/Bienes/SubPaginaReportes";
import SubPageAgregarBien from "../private_pages/Bienes/SubPageAgregarBien";

export default {
  path: "/bienes",
  element: <Bienes />,
  children: [
    {
      path: "inventario",
      element: <SubPaginaInventario />,
    },
    {
      path: "agregar",
      element: <SubPageAgregarBien />,
    },
    {
      path: "reportes",
      element: <SubPaginaReportesBienes />,
    },
  ],
};
