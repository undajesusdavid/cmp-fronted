import { Link } from "react-router-dom";
import AuthStatus from "./AuthStatus";
import "./HomePage.css"; // ¡Importa tu archivo CSS aquí!

const HomePage = () => (
  <div className="home-container">
    <div className="home-card">
      <h1 className="home-title">Contraloría del Municipio Páez</h1>
      <p className="home-description">
        Bienvenido al portal oficial de la **CMP**. Explore nuestras opciones y
        acceda a los servicios disponibles.
      </p>

      <div className="button-container">
        <Link
          to="/login"
          className="button-base primary-button" // Aplicamos las clases CSS
        >
          Iniciar Sesión
        </Link>
        <Link
          to="/dashboard"
          className="button-base secondary-button" // Aplicamos las clases CSS
        >
          Ir al Dashboard
        </Link>
      </div>

      <div className="auth-status-section">
        <AuthStatus />
      </div>
    </div>
  </div>
);

export default HomePage;
