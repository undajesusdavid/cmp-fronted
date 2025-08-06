const API_URL = import.meta.env.VITE_API_BASE_URL;
import api from "../axiosConfig";

export const getDepartamentos = async () => {
  const response = await api.get(`${API_URL}/departamento/list`);
  const departamentos = response.data;
  console.log(departamentos);
  return departamentos;
};

export const getDepartamento = async (id) => {
  const response = await api.get(`${API_URL}/departamento/get`, {
    params: { id },
  });
  const departamento = response.data;
  console.log(departamento);
  return departamento;
};
