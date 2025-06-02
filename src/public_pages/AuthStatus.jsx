import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthStatus = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <p style={{ color: "#dc3545", fontWeight: "bold" }}>
        No has iniciado sesión. Por favor,{" "}
        <Link to="/login" style={{ color: "#007bff", textDecoration: "none" }}>
          Inicia Sesión
        </Link>
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


export default AuthStatus;