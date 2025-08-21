const API_URL = import.meta.env.VITE_API_BASE_URL;
import api from "../axiosConfig";

export const getContenedores = async (id = null, signal) => {
  const response = await api.get(`${API_URL}/archivo/contenedor/list`, {
    signal,
    params: { departamento_id: id },
  });
  const contenedores = response.data;
  console.log(contenedores);
  return contenedores;
};

export const getContenedor = async (id, signal) => {
  const response = await api.get(`${API_URL}/archivo/contenedor/get`, {
    signal,
    params: { id },
  });
  const contenedor = response.data;
  console.log(contenedor);
  return contenedor;
};

export const addContenedor = async (data) => {
  const response = await api.post(
    `${API_URL}/archivo/contenedor/register`,
    data
  );
  const contenedor = response.data;
  console.log(contenedor);
  return contenedor;
};

export const updateContenedor = async (data) => {
  const response = await api.put(`${API_URL}/archivo/contenedor/update`, data);
  const contenedor = response.data;
  console.log(contenedor);
  return contenedor;
};

export const deleteContenedor = async (id) => {
  const response = await api.delete(`${API_URL}/archivo/contenedor/delete`, {
    params: { id },
  });
  const status = response.data;
  console.log(status);
  return status;
};
