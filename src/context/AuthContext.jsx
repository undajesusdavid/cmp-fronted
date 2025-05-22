import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Inicializa user basándose en localStorage desde el principio
  const [user, setUser] = useState(() => {
    const storedToken = localStorage.getItem("userToken");
    return storedToken ? { name: "Usuario Demo" } : null;
  });
  const navigate = useNavigate();

  const login = (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const token = "fake-jwt-token-12345";
        localStorage.setItem("userToken", token);
        setUser({ name: "Usuario Demo" });
        resolve(true);
      }, 500);
    });
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token && !user) {
      setUser({ name: 'Usuario Demo' });
    }
  }, [user]);

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
