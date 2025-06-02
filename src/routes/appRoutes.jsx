// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

// --- Importaciones de Componentes ---

// Páginas Públicas
import Login from "../public_pages/Login";

// Páginas Privadas (principales)
import Dashboard from "../private_pages/Dashboard";

// Página de Usuarios (Ahora un componente padre para sus sub-rutas)
import Usuarios from "../private_pages/Usuarios/Usuarios";
// Sub-páginas de Usuarios
import ListadoUsuarios from "../private_pages/Usuarios/ListadoUsuarios";
import SubPaginaRoles from "../private_pages/Usuarios/SubPaginaRoles";
import SubPaginaPermisos from "../private_pages/Usuarios/SubPaginaPermisos";
import RegistroUsuario from "../private_pages/Usuarios/RegistroUsuario";

// Página de Empleados (y sus sub-páginas)
import Empleados from "../private_pages/Empleados/Empleados";
import SubPaginaListado from "../private_pages/Empleados/SubPaginaListado";
import SubPaginaDetallesEmpleado from "../private_pages/Empleados/SubPaginaDetallesEmpleado";
import SubPaginaAgregarEmpleado from "../private_pages/Empleados/SubPaginaAgregarEmpleado";
import SubPaginaEditarEmpleado from "../private_pages/Empleados/SubPaginaEditarEmpleado";
import SubPaginaReportesEmpleado from "../private_pages/Empleados/SubPaginaReportes";

// Página de Archivo Central (y sus sub-páginas)
import ArchivoCentral from "../private_pages/ArchivoCentral/ArchivoCentral";
import SubPaginaEntrada from "../private_pages/ArchivoCentral/SubPaginaEntrada";
import SubPaginaSalida from "../private_pages/ArchivoCentral/SubPaginaSalida";
import SubPaginaDevoluciones from "../private_pages/ArchivoCentral/SubPaginaDevoluciones";
import SubPaginaInventarioArchivo from "../private_pages/ArchivoCentral/SubPaginaInventario";

// Página de Bienes (Ahora un componente padre para sus sub-rutas)
import Bienes from "../private_pages/Bienes/Bienes";
// Sub-páginas de Bienes
import SubPaginaInventario from "../private_pages/Bienes/SubPaginaInventario";
import SubPaginaReportesBienes from "../private_pages/Bienes/SubPaginaReportes";
import SubPageAgregarBien from "../private_pages/Bienes/SubPageAgregarBien"; // Agregué esta importación

// Componentes de la Aplicación (Layout/Funcionalidad)
import PrivateRoute from "./PrivateRoute";
import PrivateLayout from "../layout/PrivateLayout";

// Componente para la página de inicio pública (Si deseas mantenerlo aquí o en un archivo separado)
import HomePage from "../public_pages/HomePage"; // Importamos HomePage de App.jsx por ahora.

const AppRoutes = () => {
  return (
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
            <Route path="devoluciones" element={<SubPaginaDevoluciones />} />
            <Route path="inventario" element={<SubPaginaInventarioArchivo />} />
          </Route>

          {/* Rutas Anidadas para Empleados */}
          <Route path="/empleados" element={<Empleados />}>
            <Route path="listado" element={<SubPaginaListado />} />
            <Route path="reportes" element={<SubPaginaReportesEmpleado />} />
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
          <Route path="/usuarios" element={<Usuarios />} >
            <Route path="listado" element={<ListadoUsuarios />} />
            <Route path="roles" element={<SubPaginaRoles />} />
            <Route path="permisos" element={<SubPaginaPermisos />} />
            <Route path="registrar" element={<RegistroUsuario />} />
          </Route>
        </Route>
      </Route>
      {/* 3. Ruta para manejar 404 (Página no encontrada) */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
