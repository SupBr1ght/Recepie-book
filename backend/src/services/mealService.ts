import axios from "axios";

export class MealService {
    static async fetchMeals<T>(filters: { country?: string; ingredient?: string }): Promise<T> {
        console.log("Service get filters 😍");

        const { country, ingredient } = filters; // destructurize our object
        let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" //all our meals

        if (country) {
            url = `https:/www.themealdb.com/api/json/v1/1/filter.php?a=${country}`
            console.log('Filter by country: ', country);
        } else if(ingredient){
            url = `https:/www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
            console.log('Filter by ingredient');
        }
        try {
            console.log("🌐 processing API request:", url);
            const response = await axios.get(url);
            return response.data.meals || [];
        } catch (error) {
            console.error("❌ Помилка при запиті до API:", error);
            throw new Error("Failed to fetch meals ❌");
        }
       
       

    }
}