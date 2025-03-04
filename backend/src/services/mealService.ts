import axios from "axios";

export class MealService {
    static async fetchMeals<T>(filters: { country?: string; ingredient?: string; category?: string }): Promise<T> {

        const { country, ingredient, category } = filters; // destructurize our object
        let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" //all our meals

        if (country) {
            url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`
        } else if (ingredient) {
            url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
        } else if (category) {
            url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`

        }
        try {
            const response = await axios.get(url);
            return response.data.meals || [];
        } catch (error) {
            throw new Error("Failed to fetch recepie or meal/s ❌");
        }
    }
}