import { Outlet, useMatch } from "react-router-dom";
import Table from "./Table";

const pathRoutes = "/archivo-central/elementos";

const ElementosArchivados = () => {
  const inCurrentPage = useMatch(pathRoutes);

  if (inCurrentPage) {
    return (
      <div>
        <Table path={pathRoutes} />
      </div>
    );
  }

  return (
    <div className="pageContent">
      <Outlet />
    </div>
  );
};

export default ElementosArchivados;
