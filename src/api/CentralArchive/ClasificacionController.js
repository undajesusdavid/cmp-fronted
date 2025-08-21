const API_URL = import.meta.env.VITE_API_BASE_URL;
import api from "../axiosConfig";

export const getClasificaciones = async (id = null, signal) => {
  const response = await api.get(`${API_URL}/archivo/clasificacion/list`, {
    params: { departamento_id: id },
    signal,
  });
  return response.data;
};

export const getClasificacion = async (id, signal) => {
  const response = await api.get(`${API_URL}/archivo/clasificacion/get`, {
    params: { id: id },
    signal,
  });
  return response.data;
};

export const updateClasificacion = async (data, signal) => {
  const response = await api.put(`${API_URL}/archivo/clasificacion/update`, {
    ...data,
    signal,
  });
  return response.data;
};

export const addClasificacion = async (formData, signal) => {
  const response = await api.post(`${API_URL}/archivo/clasificacion/register`, {
    formData,
    signal,
  });
  return response.data;
};

export const deleteClasificacion = async (id, signal) => {
  const response = await api.delete(`${API_URL}/archivo/clasificacion/delete`, {
    params: { id },
    signal,
  });
  return response.data;
};
