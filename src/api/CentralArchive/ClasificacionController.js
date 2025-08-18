const API_URL = import.meta.env.VITE_API_BASE_URL;
import api from "../axiosConfig";

export const getClasificaciones = async (id = null, signal) => {
  const response = await api.get(`${API_URL}/archivo/clasificacion/list`, {
    signal,
    params: { departamento_id: id },
  });
  const clasificaciones = response.data;
  console.log(clasificaciones);
  return clasificaciones;
};

export const getClasificacion = async (id, signal) => {
  const response = await api.get(`${API_URL}/archivo/clasificacion/get`, {
    signal,
    params: { id: id },
  });
  const clasificacion = response.data;
  console.log(clasificacion);
  return clasificacion;
};

export const updateClasificacion = async (data, signal) => {
  const response = await api.put(`${API_URL}/archivo/clasificacion/update`, {
    signal,
    data,
  });
  const clasificacion = response.data;
  return clasificacion;
};

export const addClasificacion = async (formData, signal) => {
  const response = await api.post(`${API_URL}/archivo/clasificacion/register`, {
    signal,
    formData,
  });
  const clasificacion = response.data;
  return clasificacion;
};

export const deleteClasificacion = async (id, signal) => {
  const response = await api.delete(`${API_URL}/archivo/clasificacion/delete`, {
    params: { id },
    signal,
  });
  const status = response.data;
  return status;
};
