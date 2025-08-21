const API_URL = import.meta.env.VITE_API_BASE_URL;
import api from "../axiosConfig";

export const getUnidadesConservacion = async () => {
  const response = await api.get(`${API_URL}/archivo/unidad_conservacion/list`);
  return response.data;
};

export const getUnidadConservacion = async (id) => {
  const response = await api.get(`${API_URL}/archivo/unidad_conservacion/get`, {
    params: { id },
  });
  return response.data;
};
