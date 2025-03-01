import axios from "axios";

export class InfoMealService{
    static async fetchMealsbyIds<T>(filters: {id: string}): Promise<T>{
        console.log(console.log("Service get filters 😍"));

        const {id} = filters;

        let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}` // specific meal by id
        console.log("🌐 Виконуємо API-запит:", url); // Лог запиту

        try {
            console.log("🌐 processing API request:", url);
            const response = await axios.get(url);
            console.log("✅ API-response:", response.data);
            return response.data.meals || [];
        } catch (error) {
            console.error("❌ Api Error:", error);
            throw new Error("Failed to fetch info about recepie or meal/s ❌");
        }
    }
}