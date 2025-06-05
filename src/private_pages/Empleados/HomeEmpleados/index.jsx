// src/components/index.jsx
import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import empleados from "../data/empleadosData"; //
import "./index.css"; // Importa el archivo CSS

const EmployeeStatistics = () => {
  // --- Procesamiento de Datos ---

  // Distribución por Género
  const genderData = empleados.reduce((acc, empleado) => {
    const gender = empleado.genero === "M" ? "Masculino" : "Femenino"; //
    const existingGender = acc.find((item) => item.name === gender);
    if (existingGender) {
      existingGender.value += 1;
    } else {
      acc.push({ name: gender, value: 1 });
    }
    return acc;
  }, []);

  // Distribución por Departamento
  const departmentData = empleados.reduce((acc, empleado) => {
    const departmentName = empleado.departamento.nombre; //
    const existingDepartment = acc.find((item) => item.name === departmentName);
    if (existingDepartment) {
      existingDepartment.value += 1;
    } else {
      acc.push({ name: departmentName, value: 1 });
    }
    return acc;
  }, []);

  // Distribución por Nivel Académico
  const academicLevelData = empleados.reduce((acc, empleado) => {
    const levelName = empleado.nivel_academico.nivel; //
    const existingLevel = acc.find((item) => item.name === levelName);
    if (existingLevel) {
      existingLevel.value += 1;
    } else {
      acc.push({ name: levelName, value: 1 });
    }
    return acc;
  }, []);

  // Distribución por Edad de los Empleados (Ejemplo - agrupando por décadas)
  const ageData = empleados
    .reduce((acc, empleado) => {
      const birthYear = new Date(empleado.fecha_nac).getFullYear(); //
      const currentYear = new Date().getFullYear();
      const age = currentYear - birthYear;

      let ageGroup = "";
      if (age >= 20 && age <= 29) ageGroup = "20-29";
      else if (age >= 30 && age <= 39) ageGroup = "30-39";
      else if (age >= 40 && age <= 49) ageGroup = "40-49";
      else if (age >= 50 && age <= 59) ageGroup = "50-59";
      else if (age >= 60) ageGroup = "60+";
      else ageGroup = "Menos de 20";

      const existingGroup = acc.find((item) => item.name === ageGroup);
      if (existingGroup) {
        existingGroup.value += 1;
      } else {
        acc.push({ name: ageGroup, value: 1 });
      }
      return acc;
    }, [])
    .sort((a, b) => {
      const order = ["Menos de 20", "20-29", "30-39", "40-49", "50-59", "60+"];
      return order.indexOf(a.name) - order.indexOf(b.name);
    });

  // --- Renderizar Componente ---
  return (
    <div className="employee-stats-container">
      <div className="stats-grid">
        <div className="chart-card">
          <h2>Distribución por Género</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genderData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#6A8EAE" // Color principal
                label
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2>Distribución por Departamento</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={departmentData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="name"
                angle={-25}
                textAnchor="end"
                height={80}
                interval={0}
                style={{ fontSize: "0.8em" }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8B9A76" /> {/* Color principal */}
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2>Distribución por Nivel Académico</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={academicLevelData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#E6AA68" /> {/* Color principal */}
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2>Distribución por Edad</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={ageData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#D77A61" /> {/* Color principal */}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default EmployeeStatistics;
