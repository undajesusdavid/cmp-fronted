const API_URL = import.meta.env.VITE_API_BASE_URL;
import api from "../axiosConfig";

export const getAllRoles = async () => {
  try {
    const response = await api.get(`${API_URL}/roles/list`);
    return { error: null, data: response.data };
  } catch (error) {
    return { error: "Ocurrio un error inesperado", data: null };
  }
};
