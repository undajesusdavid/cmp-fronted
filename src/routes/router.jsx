import { createBrowserRouter } from "react-router-dom";

// Páginas Públicas
import Login from "../public_pages/Login";
import HomePage from "../public_pages/HomePage"; // Asumiendo que HomePage es una página pública
import NotFoundPage from "../public_pages/NotFoundPage"; // Página 404

// Páginas Privadas (principales)
import Dashboard from "../private_pages/Dashboard/Dashboard.jsx";
import rutasUsuario from "./rutasUsuario.jsx";
import rutasEmpleado from "./rutasEmpleado.jsx";
import rutasArchivo from "./rutasArchivo.jsx";
import rutasBienes from "./rutasBienes.jsx";

//Componentes envolventes
import PrivateRoute from "./PrivateRoute"; // Asumiendo que PrivateRoute es un componente que maneja la lógica de autenticación
import PrivateLayout from "../layout/PrivateLayout"; // El layout principal para rutas privadas

const router = createBrowserRouter([
  // Rutas Públicas
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  // Rutas Privadas
  {
    element: <PrivateRoute />, // Este elemento envuelve todas las rutas que requieren autenticación
    children: [
      {
        element: <PrivateLayout />, // Este layout envuelve todas las rutas dentro del área privada
        children: [
          // Páginas privadas principales
          {
            path: "/dashboard",
            element: <Dashboard />,
            handle: {
              title: "Contraloria Municipal de Páez",
              description: "",
              //crumbLabel: "Dashboard", // Etiqueta para el breadcrumb de esta ruta
            },
          },
          rutasUsuario,
          rutasEmpleado,
          rutasArchivo,
          rutasBienes,
        ]
      },
    ],
  },
  // Ruta para manejar 404 (Página no encontrada)
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
