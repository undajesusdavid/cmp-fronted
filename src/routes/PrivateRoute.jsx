import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { user } = useAuth();

  // Si no hay usuario logueado, redirige a la página de login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario, renderiza el contenido de la ruta anidada
  return <Outlet />;
};

export default PrivateRoute;
