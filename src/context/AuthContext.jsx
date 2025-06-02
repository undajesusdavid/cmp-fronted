// src/contexts/AuthContext.jsx (o donde lo tengas)
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; // Importa toast para notificaciones

const AuthContext = createContext(null);
const API_URL = import.meta.env.VITE_API_BASE_URL;

// Define el tiempo de expiración de la sesión (1 hora en milisegundos)
const SESSION_TIMEOUT_MS = 60 * 60 * 1000;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedToken = localStorage.getItem("token");
    // Si hay un token, intenta parsear el usuario. Si no, es null.
    return storedToken ? JSON.parse(localStorage.getItem("user")) : null;
  });

  const navigate = useNavigate(); // Hook para la redirección
  const sessionTimeoutRef = useRef(null); // Ref para almacenar el ID del temporizador de la sesión

  // Función para iniciar o reiniciar el temporizador de la sesión
  const startSessionTimer = () => {
    // Limpiar cualquier temporizador existente para evitar duplicados
    if (sessionTimeoutRef.current) {
      clearTimeout(sessionTimeoutRef.current);
    }

    sessionTimeoutRef.current = setTimeout(() => {
      console.log("Sesión expirada. Redirigiendo a login.");
      toast.error("Tu sesión ha expirado. Por favor, inicia sesión de nuevo.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored", // Usa un tema que resalte para errores
      });
      logout(); // Llama a logout para limpiar los datos
      // La redirección a /login ya está en logout, pero la dejo aquí como respaldo o si quieres un comportamiento diferente
      navigate("/login");
    }, SESSION_TIMEOUT_MS);
  };

  // Función para limpiar el temporizador de la sesión
  const clearSessionTimer = () => {
    if (sessionTimeoutRef.current) {
      clearTimeout(sessionTimeoutRef.current);
      sessionTimeoutRef.current = null;
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username: username,
        password: password,
      });
      const { token, user: userData } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      startSessionTimer(); // Iniciar el temporizador al iniciar sesión exitosamente
      toast.success("¡Inicio de sesión exitoso!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return true;
    } catch (err) {
      console.error("Error during login:", err);
      // Mostrar notificación de error en caso de fallo de login
      toast.error("Error al iniciar sesión. Verifica tus credenciales.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
    clearSessionTimer(); // Limpiar el temporizador al cerrar sesión
    toast.info("Has cerrado sesión.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate("/login"); // Redirigir a la página de login
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // Si hay un token al cargar la app, iniciar el temporizador de la sesión
      // Esto asume que el token almacenado es válido y quieres que la sesión expire 1h después de la carga.
      startSessionTimer();
    }

    // Limpiar el temporizador cuando el componente AuthProvider se desmonte
    return () => {
      clearSessionTimer();
    };
  }, []); // El array vacío asegura que este useEffect se ejecute solo una vez al montar

  // Opcional: Reiniciar el temporizador en actividad del usuario para sesiones "persistentes"
  // Si deseas que la sesión se reinicie con cada interacción (clic, teclado, etc.)
  // Descomenta y adapta el siguiente useEffect y los event listeners.
  /*
  useEffect(() => {
    const handleActivity = () => {
      if (user) { // Solo reiniciar si el usuario está logueado
        startSessionTimer();
      }
    };

    document.addEventListener('mousemove', handleActivity);
    document.addEventListener('keypress', handleActivity);
    document.addEventListener('click', handleActivity);

    return () => {
      document.removeEventListener('mousemove', handleActivity);
      document.removeEventListener('keypress', handleActivity);
      document.removeEventListener('click', handleActivity);
    };
  }, [user]); // Dependencia en 'user' para asegurar que el listener se active solo cuando haya un usuario
  */

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
