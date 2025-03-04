import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL
console.log("ENV VARIABLES:", import.meta.env);
export const fetchMeals = async () => {
    const response = await axios.get(`${API_URL}/meals`);
    console.log(response.data);
    return response.data;
};

export const fetchSpecMeal = async (id: string): Promise<any> => {
    console.log(`Запит до бекенду: ${API_URL}/info/${id}`);
    const response = await axios.get(`${API_URL}/info/${id}`);
    console.log(`Info about specific meal here ${response.data}`);
    return response.data;
}
