import { FaSpinner } from "react-icons/fa"; // Importa el icono de spinner que prefieras

/**
 * Componente reutilizable para mostrar un indicador de carga.
 *
 * @param {object} props - Las propiedades del componente.
 * @param {string} [props.message="Cargando..."] - Mensaje opcional a mostrar junto al spinner.
 * @param {string} [props.color="#007bff"] - Color del spinner.
 * @param {string} [props.size="2em"] - Tamaño del spinner (ej. "1em", "24px").
 * @param {object} [props.style={}] - Estilos CSS adicionales para el contenedor del spinner.
 * @param {string} [props.className=""] - Clases CSS adicionales para el contenedor del spinner.
 */
const LoadingSpinner = ({
  message = "Cargando...",
  color = "#007bff",
  size = "2em",
  style = {},
  className = "",
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        ...style,
      }}
      className={`loading-spinner-container ${className}`}
    >
      <FaSpinner
        style={{
          color: color,
          fontSize: size,
          animation: "spin 1s linear infinite", // Animación para hacer girar el spinner
        }}
        aria-label={message} // Accesibilidad
      />
      {message && <p style={{ marginTop: "10px", color: "#555" }}>{message}</p>}

      {/* Estilos para la animación (pueden ir en un archivo CSS global o aquí) */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner;
