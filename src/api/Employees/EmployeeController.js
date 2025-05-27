const API_URL = import.meta.env.VITE_API_BASE_URL;
import api from "../axiosConfig";

export const getAllEmployees = async () => {
    const response = await api.get(`${API_URL}/employee/list`);
    const employees = response.data;
    return employees;
}

export const getOneEmployee = async (id) => {
    const response = await api.get(`${API_URL}/employee/get`,{params:{id}});
    const employee = response.data;
    return employee;
}

export const addEmployee = async (formData) => {
    const response = await api.post(`${API_URL}/employee/register`,{...formData});
    const employee = response.data;
    return employee.id;
}

export const getMetadataEmployee = async () => {
    const response = await api.get(`${API_URL}/employee/metadata`);
    const metadata = response.data;
    return metadata;
}