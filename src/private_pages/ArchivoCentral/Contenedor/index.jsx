import { Outlet, useMatch } from "react-router-dom";
import Table from "./Table";

const pathRoutes = "/archivo-central/contenedores";

const nameModule = () => {
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

export default nameModule;