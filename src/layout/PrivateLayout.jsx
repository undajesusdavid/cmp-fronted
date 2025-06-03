import { Outlet, useMatches } from "react-router-dom"; // Outlet renderiza el componente hijo de la ruta
import Sidebar from "./Sidebar"; // Tu Sidebar ya existente
import styles from "./PrivateLayout.module.css"; // Crearás este archivo CSS
import SectionHeader from "../components/SectionHeader/SectionHeader";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";

const PrivateLayout = () => {
  const matches = useMatches();
  const currentMatch = matches[matches.length - 1];
  const handle = currentMatch?.handle;

  const breadcrumbs = matches
    .filter((match) => match.handle && match.handle.crumbLabel)
    .map((match) => ({
      label: match.handle.crumbLabel, // Usamos 'crumbLabel' para el texto de la miga de pan
      path: match.pathname, // 'pathname' es la URL de esa ruta coincidente
    }));

  return (
    <div className={styles.privateLayoutContainer}>
      <Sidebar />
      <main className={styles.mainContentArea}>
        <Breadcrumbs items={breadcrumbs}/>
        <SectionHeader
          title={handle?.title || 'Título por Defecto'}
          description={handle?.description || ''}
        />
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;
