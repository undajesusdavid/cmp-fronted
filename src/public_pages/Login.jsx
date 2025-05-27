import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { useAuth } from "../context/AuthContext"; // Importa useAuth
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Para el estado de carga
  const [error, setError] = useState(""); // Para mensajes de error
  const { login } = useAuth(); // Obtiene la función login del contexto
  const navigate = useNavigate(); // Obtiene la función de navegación

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Limpiar errores anteriores

    try {
      const success = await login(email, password); // Llama a la función login del contexto
      if (success) {
        navigate("/dashboard"); // Redirige a la ruta privada después del login exitoso
        console.log("Exito al inicar session")
      } else {
        setError("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
      }
    } catch (err) {
      setError("Ocurrió un error al intentar iniciar sesión.");
      console.error("Error de login:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h2 className={styles.loginTitle}>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              className={styles.formInput}
              placeholder="tu@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className={styles.formInput}
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className={styles.errorMessage}>{error}</p>}{" "}
          {/* Muestra el error */}
          <button
            type="submit"
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? "Cargando..." : "Entrar"}
          </button>
          <p className={styles.forgotPassword}>
            <a href="#forgot-password">¿Olvidaste tu contraseña?</a>
          </p>
          <p className={styles.signUpPrompt}>
            ¿No tienes una cuenta? <a href="#sign-up">Regístrate aquí</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
