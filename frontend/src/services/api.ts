import axios from "axios";

const API_URL = "http://localhost:3000/meals"; // Якщо бекенд локальний

export const fetchMeals = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const fetchMealById = async (id: string) => {
    const response = await axios.get(`http://localhost:3000/info?id=${id}`);
    return response.data;
};
