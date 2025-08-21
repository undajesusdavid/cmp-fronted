const API_URL = import.meta.env.VITE_API_BASE_URL;
import api from "../axiosConfig";

export const getExpedientes = async (id = null, signal) => {
  const response = await api.get(`${API_URL}/archivo/expediente/list`, {
    signal,
    params: { departamento_id: id },
  });
  return response.data;
};

export const getExpediente = async (id, signal) => {
  const response = await api.get(`${API_URL}/archivo/expediente/get`, {
    params: { id },
    signal,
  });
  return response.data;
};

export const addExpediente = async (data, signal) => {
  const response = await api.post(`${API_URL}/archivo/expediente/register`, {
    data,
    signal,
  });
  return response.data;
};

export const updateExpediente = async (data, signal) => {
  const response = await api.put(`${API_URL}/archivo/expediente/update`, {
    data,
    signal,
  });
  return response.data;
};

export const deleteExpediente = async (id, signal) => {
  const response = await api.delete(`${API_URL}/archivo/expediente/delete`, {
    params: { id },
    signal,
  });
  return response.data;
};
