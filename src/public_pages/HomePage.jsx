import { Link } from "react-router-dom";
import AuthStatus from "./AuthStatus";
import NewsCarousel from "./NewsCarousel";
import "./HomePage.css"; // ¡Importa tu archivo CSS aquí!

const HomePage = () => {
  // Simulación de estado de login (modifica según tu lógica real)
  const isLoggedIn = false; // Cambia esto por tu lógica de autenticación

  return (
    <div className="home-container">
      <header className="main-navbar">
        <div className="navbar-left">
          <img src="/cmp.svg" alt="Logo CMP" className="navbar-logo" />
        </div>
        <nav className="navbar-center">
          <ul className="navbar-menu">
            <li className="menu-item">
              <span
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                  <path
                    d="M4 4h12v2H4V4zm0 4h12v2H4V8zm0 4h8v2H4v-2z"
                    fill="#007bff"
                  />
                </svg>
                Institución
              </span>
              <ul className="submenu">
                <li>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                      <path
                        d="M8 2l6 6-1.4 1.4L8 4.8 3.4 9.4 2 8l6-6z"
                        fill="#218838"
                      />
                    </svg>
                    Historia
                  </span>
                </li>
                <li>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                      <circle
                        cx="8"
                        cy="8"
                        r="6"
                        stroke="#007bff"
                        strokeWidth="2"
                      />
                      <path
                        d="M8 4v4l2 2"
                        stroke="#007bff"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    Misión
                  </span>
                </li>
                <li>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                      <path
                        d="M8 2v12M2 8h12"
                        stroke="#007bff"
                        strokeWidth="2"
                      />
                    </svg>
                    Visión
                  </span>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <span
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                  <path
                    d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 12H9v-2h2v2zm0-4H9V6h2v4z"
                    fill="#218838"
                  />
                </svg>
                Servicios
              </span>
              <ul className="submenu">
                <li>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                      <rect
                        x="3"
                        y="3"
                        width="10"
                        height="10"
                        rx="2"
                        stroke="#218838"
                        strokeWidth="2"
                      />
                    </svg>
                    Trámites
                  </span>
                </li>
                <li>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                      <path
                        d="M2 8h12M8 2v12"
                        stroke="#007bff"
                        strokeWidth="2"
                      />
                    </svg>
                    Consultas
                  </span>
                </li>
                <li>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                      <path d="M4 12V4h8v8" stroke="#218838" strokeWidth="2" />
                    </svg>
                    Reportes
                  </span>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <span
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                  <path
                    d="M4 4h12v2H4V4zm0 4h12v2H4V8zm0 4h8v2H4v-2z"
                    fill="#007bff"
                  />
                </svg>
                Noticias
              </span>
              <ul className="submenu">
                <li>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                      <circle
                        cx="8"
                        cy="8"
                        r="6"
                        stroke="#007bff"
                        strokeWidth="2"
                      />
                    </svg>
                    Eventos
                  </span>
                </li>
                <li>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                      <rect
                        x="3"
                        y="3"
                        width="10"
                        height="10"
                        rx="2"
                        stroke="#218838"
                        strokeWidth="2"
                      />
                    </svg>
                    Comunicados
                  </span>
                </li>
                <li>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                      <path
                        d="M8 2v12M2 8h12"
                        stroke="#007bff"
                        strokeWidth="2"
                      />
                    </svg>
                    Boletines
                  </span>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <div className="navbar-right">
          {isLoggedIn ? (
            <Link to="/dashboard" className="navbar-btn dashboard-btn">
              Ir al Dashboard
            </Link>
          ) : (
            <Link to="/login" className="navbar-btn login-btn">
              Iniciar Sesión
            </Link>
          )}
        </div>
      </header>

      <NewsCarousel />
    </div>
  );
};

export default HomePage;
