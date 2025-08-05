const API_URL = import.meta.env.VITE_API_BASE_URL;
import api from "../axiosConfig";

export const getAllInventory = async () => {
    const response = await api.get(`${API_URL}/archivo/inventario/list`);
    const inventory = response.data;
  console.log(inventory);
    return inventory;
}


export const getItemInventory = async (id) => {
    const response = await api.get(`${API_URL}/archivo/inventario/get`,{params:{id}});
    const item = response.data;
    console.log(item);
    return item;
}
