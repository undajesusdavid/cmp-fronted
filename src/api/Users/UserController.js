const API_URL = import.meta.env.VITE_API_BASE_URL;
import api from "../axiosConfig";

export const getAllUsers = async () => {
  try {
    const response = await api.get(`${API_URL}/user/list`);
    return { error: null, data: response.data };
  } catch (error) {
    return { error: "Ocurrio un error inesperado", data: null };
  }
};

export const addUser = async (request) => {
  try {
    const response = await api.post(`${API_URL}/user/register`, { ...request });
    return { error: null, data: response.data };
  } catch (error) {
    return { error: "Ocurrio un error inesperado", data: null };
  }
};

export const getMetadataUser = async () => {
  try {
    const response = await api.get(`${API_URL}/user/metadata`);
    return { error: null, data: response.data };
  } catch (error) {
    return { error: "Ocurrio un error inesperado", data: null };
  }
};
