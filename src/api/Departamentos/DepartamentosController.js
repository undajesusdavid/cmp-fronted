const API_URL = import.meta.env.VITE_API_BASE_URL;
import api from "../axiosConfig";

export const getDepartamentos = async (signal) => {
  const response = await api.get(`${API_URL}/departamento/list`, { signal });
  return response.data;
};

export const getDepartamento = async (id, signal) => {
  const response = await api.get(`${API_URL}/departamento/get`, {
    params: { id },
    signal,
  });
  return response.data;
};
