import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./index.css";
import inventarioBienesData from "../data/inventarioBienesData"; // Importa la data

const HomeBienes = () => {
  const [processedData, setProcessedData] = useState({
    totalBienes: 0,
    totalValor: 0,
    bienesPorCategoriaGeneral: [],
    bienesPorUnidadAdministrativa: [],
    bienesPorEstadoUso: [],
  });

  useEffect(() => {
    // Procesar la data al cargar el componente
    const processInventarioData = (data) => {
      let totalBienes = data.length;
      let totalValor = 0;
      const bienesPorCategoriaGeneralMap = new Map();
      const bienesPorUnidadAdministrativaMap = new Map();
      const bienesPorEstadoUsoMap = new Map();

      data.forEach((item) => {
        // Limpiar y sumar valor de adquisición
        const valorAdquisicionClean = parseFloat(
          item.valorAdquisicion.replace(".", "").replace(",", ".")
        );
        if (!isNaN(valorAdquisicionClean)) {
          totalValor += valorAdquisicionClean;
        }

        // Conteo por categoriaGeneral
        const categoria = item.categoriaGeneral.replace(/_/g, " "); // Limpiar guiones
        bienesPorCategoriaGeneralMap.set(
          categoria,
          (bienesPorCategoriaGeneralMap.get(categoria) || 0) + 1
        );

        // Conteo por unidadAdministrativa
        bienesPorUnidadAdministrativaMap.set(
          item.unidadAdministrativa,
          (bienesPorUnidadAdministrativaMap.get(item.unidadAdministrativa) ||
            0) + 1
        );

        // Conteo por estadoUsoDelBien
        bienesPorEstadoUsoMap.set(
          item.estadoUsoDelBien,
          (bienesPorEstadoUsoMap.get(item.estadoUsoDelBien) || 0) + 1
        );
      });

      const bienesPorCategoriaGeneral = Array.from(
        bienesPorCategoriaGeneralMap.entries()
      ).map(([name, value]) => ({ name, value }));
      const bienesPorUnidadAdministrativa = Array.from(
        bienesPorUnidadAdministrativaMap.entries()
      ).map(([name, value]) => ({ name, value }));
      const bienesPorEstadoUso = Array.from(
        bienesPorEstadoUsoMap.entries()
      ).map(([name, value]) => ({ name, value }));

      return {
        totalBienes,
        totalValor,
        bienesPorCategoriaGeneral,
        bienesPorUnidadAdministrativa,
        bienesPorEstadoUso,
      };
    };

    setProcessedData(processInventarioData(inventarioBienesData));
  }, []);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A28DFF",
    "#FF6B6B",
  ];

  // Custom Tooltip para el gráfico de pastel
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${payload[0].name}`}</p>
          <p className="intro">{`Cantidad: ${payload[0].value.toLocaleString()}`}</p>
          <p className="desc">{`Porcentaje: ${(
            payload[0].percent * 100
          ).toFixed(2)}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="home-bienes-central">
      <div className="stats-summary">
        <div className="stat-card total-bienes">
          <h3>Total de Bienes</h3>
          <p>{processedData.totalBienes.toLocaleString()}</p>
        </div>
        <div className="stat-card total-valor">
          <h3>Valor Total de Adquisición</h3>
          <p>
            Bs.{" "}
            {processedData.totalValor.toLocaleString("es-VE", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>

      <div className="charts-container">
        {/* Gráfico de Barras: Bienes por Unidad Administrativa */}
        <div className="chart-card unit-chart">
          <h3 className="chart-title">Bienes por Unidad Administrativa</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={processedData.bienesPorUnidadAdministrativa}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Pastel: Bienes por Categoría General */}
        <div className="chart-card category-chart">
          <h3 className="chart-title">Bienes por Categoría General</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={processedData.bienesPorCategoriaGeneral}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {processedData.bienesPorCategoriaGeneral.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Barras: Bienes por Estado de Uso */}
        <div className="chart-card status-chart">
          <h3 className="chart-title">Bienes por Estado de Uso</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={processedData.bienesPorEstadoUso}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#28a745" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HomeBienes;
