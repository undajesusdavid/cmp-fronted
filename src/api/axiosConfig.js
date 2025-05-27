import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de solicitud
api.interceptors.request.use(
  (config) => {
    // Obtener el token de acceso del almacenamiento local (o donde lo guardes)
    const accessToken = localStorage.getItem("token"); // O sessionStorage.getItem('accessToken');
    // Si existe un token, adjuntarlo al encabezado de Autorización
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    // Manejar errores de solicitud
    return Promise.reject(error);
  }
);

export default api;
