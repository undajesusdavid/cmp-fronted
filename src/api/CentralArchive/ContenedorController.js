const API_URL = import.meta.env.VITE_API_BASE_URL;
import api from "../axiosConfig";

export const getContenedores = async (departamento_id = null, signal) => {
  const response = await api.get(`${API_URL}/archivo/contenedor/list`, {
    params: { departamento_id },
    signal,
  });
  return response.data;
};

export const getContenedor = async (id, signal) => {
  const response = await api.get(`${API_URL}/archivo/contenedor/get`, {
    params: { id },
    signal,
  });
  return response.data;
};

export const addContenedor = async (data, signal) => {
  const response = await api.post(`${API_URL}/archivo/contenedor/register`, {
    ...data,
    signal,
  });
  return response.data;
};

export const updateContenedor = async (data, signal) => {
  const response = await api.put(`${API_URL}/archivo/contenedor/update`, {
    ...data,
    signal,
  });
  return response.data;
};

export const deleteContenedor = async (id, signal) => {
  const response = await api.delete(`${API_URL}/archivo/contenedor/delete`, {
    params: { id },
    signal,
  });
  return response.data;
};
