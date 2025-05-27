import React, { createContext, useContext, useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import axios from "axios";


const AuthContext = createContext(null);
const API_URL = import.meta.env.VITE_API_BASE_URL;

export const AuthProvider = ({ children }) => {
  // Inicializa user basándose en localStorage desde el principio
  const [user, setUser] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken ? JSON.parse(localStorage.getItem("user")) : null;
  });

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username: username,
        password: password,
      });
      const { token, user: userData } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData)); // Guardar los datos del usuario
      setUser(userData);
      console.log(userData);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Configurar el header para futuras solicitudes
      return true; // Indicar éxito
    } catch (err) {
      console.error("Error during login:", err);
      return false; // Indicar fallo
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    delete axios.defaults.headers.common["Authorization"]; // Eliminar el header
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
