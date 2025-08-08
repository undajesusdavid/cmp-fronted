const API_URL = import.meta.env.VITE_API_BASE_URL;
import api from "../axiosConfig";

export const getExpedientes = async () => {
  const response = await api.get(`${API_URL}/archivo/expediente/list`);
  const expedientes = response.data;
  console.log(expedientes);
  return expedientes;
};

export const getExpediente = async (id) => {
  const response = await api.get(`${API_URL}/archivo/expediente/get`, {
    params: { id },
  });
  const expediente = response.data;
  console.log(expediente);
  return expediente;
};

export const addExpediente = async (data) => {
  const response = await api.post(
    `${API_URL}/archivo/expediente/register`,
    data
  );
  const expediente = response.data;
  console.log(expediente);
  return expediente;
};
