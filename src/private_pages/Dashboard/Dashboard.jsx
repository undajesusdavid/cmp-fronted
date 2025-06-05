// src/components/Dashboard.jsx
import React from "react";
import "./Dashboard.css"; // Importa el archivo CSS

const Dashboard = () => {
  // Puedes obtener el nombre del usuario logueado de un estado o contexto global si lo tienes
  const userName = ""; // Valor por defecto

  return (
    <div className="dashboard-container">
      <div className="welcome-card">
        <h1 className="welcome-title">
          ¡Bienvenido{userName ? ", "+userName : ""}!
        </h1>
        <p className="welcome-message">
          Nos alegra verte. Aquí podrás encontrar las estadísticas y la
          información relevante de tus empleados. Explora las diferentes
          secciones para obtener una visión completa del rendimiento y la
          composición de tu equipo.
        </p>
        {/* Los botones han sido eliminados */}
      </div>
    </div>
  );
};

export default Dashboard;
