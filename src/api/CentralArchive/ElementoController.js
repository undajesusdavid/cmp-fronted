const API_URL = import.meta.env.VITE_API_BASE_URL;
import api from "../axiosConfig";

export const getElementosArchivados = async (signal) => {
  const response = await api.get(`${API_URL}/archivo/elemento/list`,{signal});
  const inventory = response.data;
  console.log(inventory);
  return inventory;
};

export const getElementosSinContenedor = async (signal) => {
  const response = await api.get(`${API_URL}/archivo/elemento/list/sin_contenedor`,{signal});
  const elementos = response.data;
  console.log(elementos);
  return elementos;
};

export const getElementoArchivado = async (id,signal) => {
  const response = await api.get(`${API_URL}/archivo/elemento/get`, {
    signal,
    params: { id },
  });
  const item = response.data;
  console.log(item);
  return item;
};

export const addElementoArchivado = async (data) => {
  const response = await api.post(`${API_URL}/archivo/elemento/register`, data);
  const item = response.data;
  console.log(item);
  return item;
};


export const updateElementoArchivado = async (data) => {
  const response = await api.put(`${API_URL}/archivo/elemento/update`, data);
  return response.data;
};


export const deleteElementoArchivado = async (id) => {
  const response = await api.delete(`${API_URL}/archivo/elemento/delete`, {
    params: { id },
  });
  const status = response.data;
  return status;
};
