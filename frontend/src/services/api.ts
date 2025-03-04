import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

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

export const fetchFilteredMeals = async (filterType: "country" | "ingredient", filterValue: string) => {
    try {
        const url = `http://localhost:3000/filter/${filterType}/${filterValue}`;
        console.log("🔍 Відправляємо запит на:", url);

        const response = await axios.get(`http://localhost:3000/meals/filter?${filterType}=${filterValue}`);
        console.log("🔍 API response:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Помилка при отриманні фільтрованих рецептів:", error);
        return [];
    }
}