const API_URL = import.meta.env.VITE_API_BASE_URL;
import api from "../axiosConfig";

export const getClasificaciones = async () => {
    const response = await api.get(`${API_URL}/archivo/clasificacion/list`);
    const clasificaciones = response.data;
    console.log(clasificaciones);
    return clasificaciones;
}


export const getClasificacion = async (id) => {
    const response = await api.get(`${API_URL}/archivo/clasificacion/get`,{params:{id}});
    const clasificacion = response.data;
    console.log(clasificacion);
    return clasificacion;
}


export const addClasificacion = async (formData) => {
    const response = await api.post(`${API_URL}/archivo/clasificacion/register`,{...formData});
    const clasificacion = response.data;
    return clasificacion;
}

