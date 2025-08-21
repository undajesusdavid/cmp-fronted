import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  function (response) {
    // ✅ Aquí puedes modificar o inspeccionar la respuesta
    console.log('Respuesta interceptada:', response);
    return response;
  },
  function (error) {
    // ❌ Aquí manejas errores de forma global
    console.error('Error interceptado:', error);
    return Promise.reject(error);
  }
);

// Interceptor de solicitud
api.interceptors.request.use(
  (config) => {
    // Validación del parámetro 'signal'
    if (config.signal && config.signal.aborted) {
      delete config.signal;
    }

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
