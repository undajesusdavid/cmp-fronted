const API_URL = import.meta.env.VITE_API_BASE_URL;
import api from "../axiosConfig";

export const getElementosArchivados = async (signal) => {
  const response = await api.get(`${API_URL}/archivo/elemento/list`, {
    signal,
  });
  return response.data;
};

export const getElementosSinContenedor = async (signal) => {
  const response = await api.get(
    `${API_URL}/archivo/elemento/list/sin_contenedor`,
    { signal }
  );
  return response.data;
};

export const getElementoArchivado = async (id, signal) => {
  // Validación del parámetro 'id'
  if (!id) {
    throw new Error("El parámetro 'id' es obligatorio y no puede estar vacío.");
  }

  const response = await api.get(`${API_URL}/archivo/elemento/get`, {
    params: { id },
    signal,
  });

  return response.data;
};

export const addElementoArchivado = async (data, signal) => {
  const response = await api.post(`${API_URL}/archivo/elemento/register`, {
    ...data,
    signal,
  });
  return response.data;
};

export const updateElementoArchivado = async (data, signal) => {
  const response = await api.put(`${API_URL}/archivo/elemento/update`, {
    ...data,
    signal,
  });
  return response.data;
};

export const deleteElementoArchivado = async (id) => {
  const response = await api.delete(`${API_URL}/archivo/elemento/delete`, {
    params: { id },
    signal,
  });
  return response.data;
};
