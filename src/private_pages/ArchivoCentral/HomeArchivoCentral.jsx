import React, { useState } from "react";
import "../stylesPrivatePages.css";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import "./HomeArchivoCentral.css";
import { mockInventoryData, mockFlowData } from "./data/mockData";

const HomeArchivoCentral = () => {
  const [data] = useState({
    inventory: mockInventoryData,
    flow: mockFlowData,
  });

  // Función de ejemplo para calcular totales
  const totalFiles = data.inventory.reduce((sum, item) => sum + item.count, 0);
  const totalIncoming = data.flow.reduce((sum, item) => sum + item.incoming, 0);
  const totalOutgoing = data.flow.reduce((sum, item) => sum + item.outgoing, 0);

  // Formateador de fecha para el gráfico de flujo
  const dateFormatter = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-VE", { month: "short", day: "numeric" });
  };

  return (
     <div className="pageContent">
      <h2 className="section-title">Estadísticas del Archivo Central</h2>

      <div className="stats-summary">
        <div className="stat-card total-files">
          <h3>Total de Archivos</h3>
          <p>{totalFiles.toLocaleString()}</p>
        </div>
        <div className="stat-card total-incoming">
          <h3>Total Entrada (Últimos 30 días)</h3>
          <p>{totalIncoming.toLocaleString()}</p>
        </div>
        <div className="stat-card total-outgoing">
          <h3>Total Salida (Últimos 30 días)</h3>
          <p>{totalOutgoing.toLocaleString()}</p>
        </div>
      </div>

      <div className="charts-container">
        {/* Gráfico de Inventario (Barras) */}
        <div className="chart-card inventory-chart">
          <h3 className="chart-title">Inventario de Archivos por Tipo</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data.inventory}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="type" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} />
              <Bar dataKey="count" fill="#007bff" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Flujo (Líneas) */}
        <div className="chart-card flow-chart">
          <h3 className="chart-title">
            Flujo de Documentos (Entrada y Salida)
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={data.flow}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                tickFormatter={dateFormatter}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                label={{
                  value: "Número de Documentos",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#666",
                }}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="incoming"
                stroke="#28a745"
                activeDot={{ r: 8 }}
                name="Entrada"
              />
              <Line
                type="monotone"
                dataKey="outgoing"
                stroke="#dc3545"
                activeDot={{ r: 8 }}
                name="Salida"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HomeArchivoCentral;
