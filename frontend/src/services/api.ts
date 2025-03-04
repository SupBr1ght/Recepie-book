import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

export const fetchMeals = async () => {
    const response = await axios.get(`${API_URL}/meals`);
    return response.data;
};

export const fetchSpecMeal = async (id: string): Promise<any> => {
    const response = await axios.get(`${API_URL}/info/${id}`);
    return response.data;
}

export const fetchFilteredMeals = async (filterType: "country" | "ingredient"| "category", filterValue: string) => {
    try {
        const response = await axios.get(`http://localhost:3000/meals?${filterType}=${filterValue}`);
        return response.data;
    } catch (error) {
        return [];
    }
}