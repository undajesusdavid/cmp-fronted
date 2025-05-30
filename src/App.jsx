// src/App.jsx

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

// --- Importaciones de Componentes ---

// Páginas Públicas
import Login from "./public_pages/Login";

// Páginas Privadas (principales)
import Dashboard from "./private_pages/Dashboard";

// Página de Usuarios (Ahora un componente padre para sus sub-rutas)
import Usuarios from "./private_pages/Usuarios/Usuarios"; // <-- RUTA ACTUALIZADA

// Sub-páginas de Usuarios
import ListadoUsuarios from "./private_pages/Usuarios/ListadoUsuarios";
import SubPaginaRoles from "./private_pages/Usuarios/SubPaginaRoles";
import SubPaginaPermisos from "./private_pages/Usuarios/SubPaginaPermisos";
import RegistroUsuario from "./private_pages/Usuarios/RegistroUsuario";

// Página de Empleados (y sus sub-páginas)
import Empleados from "./private_pages/Empleados/Empleados";
import SubPaginaListado from "./private_pages/Empleados/SubPaginaListado";
import SubPaginaDetallesEmpleado from "./private_pages/Empleados/SubPaginaDetallesEmpleado";
import SubPaginaAgregarEmpleado from "./private_pages/Empleados/SubPaginaAgregarEmpleado";
import SubPaginaEditarEmpleado from "./private_pages/Empleados/SubPaginaEditarEmpleado";
import SubPaginaReportesEmpleado from "./private_pages/Empleados/SubPaginaReportes";
import SubPageAgregarBien from "./private_pages/Bienes/SubPageAgregarBien";
// Página de Archivo Central (y sus sub-páginas)
import ArchivoCentral from "./private_pages/ArchivoCentral/ArchivoCentral";
import SubPaginaEntrada from "./private_pages/ArchivoCentral/SubPaginaEntrada"; // <-- NUEVO
import SubPaginaSalida from "./private_pages/ArchivoCentral/SubPaginaSalida"; // <-- NUEVO
import SubPaginaDevoluciones from "./private_pages/ArchivoCentral/SubPaginaDevoluciones"; // <-- NUEVO
import SubPaginaInventarioArchivo from "./private_pages/ArchivoCentral/SubPaginaInventario"; // <-- NUEVO

// Página de Bienes (Ahora un componente padre para sus sub-rutas)
import Bienes from "./private_pages/Bienes/Bienes";

// Sub-páginas de Bienes
import SubPaginaInventario from "./private_pages/Bienes/SubPaginaInventario"; // <-- NUEVO
import SubPaginaReportesBienes from "./private_pages/Bienes/SubPaginaReportes"; // <-- NUEVO

// Componentes de la Aplicación (Layout/Funcionalidad)
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";
import PrivateLayout from "./layout/PrivateLayout";

// --- Componentes Auxiliares para el Layout y la Información (Sin Cambios aquí) ---

const HomePage = () => (
  <div
    style={{
      padding: "20px",
      textAlign: "center",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <h1>Bienvenido a la página de inicio (Pública)</h1>
    <p style={{ fontSize: "1.1em", color: "#555" }}>
      Explora nuestras opciones:
    </p>
    <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
      <Link
        to="/login"
        style={{
          textDecoration: "none",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          borderRadius: "5px",
          fontWeight: "bold",
        }}
      >
        Iniciar Sesión
      </Link>
      <Link
        to="/dashboard"
        style={{
          textDecoration: "none",
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "white",
          borderRadius: "5px",
          fontWeight: "bold",
        }}
      >
        Ir al Dashboard (Privado)
      </Link>
    </div>
    <div
      style={{
        marginTop: "30px",
        borderTop: "1px solid #ccc",
        paddingTop: "20px",
        width: "80%",
      }}
    >
      <AuthStatus />
    </div>
  </div>
);

const AuthStatus = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <p style={{ color: "#dc3545", fontWeight: "bold" }}>
        No has iniciado sesión. Por favor,{" "}
        <Link to="/login" style={{ color: "#007bff", textDecoration: "none" }}>
          Inicia Sesión
        </Link>{" "}
        para acceder al contenido privado.
      </p>
    );
  }

  return (
    <p style={{ color: "#28a745", fontWeight: "bold" }}>
      Bienvenido, {user.name}!{" "}
      <button
        onClick={() => logout()}
        style={{
          marginLeft: "15px",
          padding: "8px 15px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
          transition: "background-color 0.2s ease",
        }}
      >
        Cerrar Sesión
      </button>
    </p>
  );
};

// --- Componente Principal de la Aplicación ---

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* 1. Rutas Públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />

          {/* 2. Rutas Privadas */}
          <Route element={<PrivateRoute />}>
            <Route element={<PrivateLayout />}>
              {/* Páginas privadas principales */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/bienes" element={<Bienes />} />

              {/* Rutas Anidadas para Archivo Central */}
              <Route path="/archivo-central" element={<ArchivoCentral />}>
                <Route index element={<SubPaginaEntrada />} />
                <Route path="entrada" element={<SubPaginaEntrada />} />
                <Route path="salida" element={<SubPaginaSalida />} />
                <Route
                  path="devoluciones"
                  element={<SubPaginaDevoluciones />}
                />
                <Route
                  path="inventario"
                  element={<SubPaginaInventarioArchivo />}
                />
              </Route>

              {/* Rutas Anidadas para Empleados */}
              <Route path="/empleados" element={<Empleados />}>
                <Route path="listado" element={<SubPaginaListado />} />
                <Route
                  path="reportes"
                  element={<SubPaginaReportesEmpleado />}
                />
                <Route
                  path="detalles/:empleadoId"
                  element={<SubPaginaDetallesEmpleado />}
                />
                <Route path="agregar" element={<SubPaginaAgregarEmpleado />} />
                <Route
                  path="editar/:empleadoId"
                  element={<SubPaginaEditarEmpleado />}
                />
              </Route>

              {/* Rutas Anidadas para Bienes */}
              <Route path="/bienes" element={<Bienes />}>
                <Route path="inventario" element={<SubPaginaInventario />} />
                <Route path="agregar" element={<SubPageAgregarBien />} />
                <Route path="reportes" element={<SubPaginaReportesBienes />} />
              </Route>

              {/* Rutas Anidadas para Usuarios */}
              <Route path="/usuarios" element={<Usuarios />}>
                <Route path="listado" element={<ListadoUsuarios />} />
                <Route path="roles" element={<SubPaginaRoles />} />
                <Route path="permisos" element={<SubPaginaPermisos />} />
                <Route path="registrar" element={<RegistroUsuario />} />
              </Route>
            </Route>
          </Route>

          {/* 3. Ruta para manejar 404 (Página no encontrada) */}
          <Route
            path="*"
            element={
              <div
                style={{
                  padding: "50px",
                  textAlign: "center",
                  backgroundColor: "#f8d7da",
                  color: "#721c24",
                  border: "1px solid #f5c6cb",
                  borderRadius: "8px",
                  margin: "50px auto",
                  maxWidth: "600px",
                }}
              >
                <h2 style={{ fontSize: "2.5em", marginBottom: "15px" }}>
                  🚨 404 - Página No Encontrada 🚨
                </h2>
                <p style={{ fontSize: "1.2em", marginBottom: "25px" }}>
                  Lo sentimos, la página que buscas no existe.
                </p>
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    padding: "12px 25px",
                    backgroundColor: "#007bff",
                    color: "white",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    fontSize: "1.1em",
                  }}
                >
                  Volver a la Página de Inicio
                </Link>
              </div>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
