import axios from "axios";

export class MealService {
    static async fetchMeals<T>(filters: { country?: string; ingredient?: string }): Promise<T> {
        console.log("Service get filters 😍");

        const { country, ingredient } = filters; // destructurize our object
        let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" //all our meals

        if (country) {
            url = `www.themealdb.com/api/json/v1/1/filter.php?a=${country}`
            console.log('Filter by country: ', country);
        }

        console.log("🌐 processing API request:", url);
        const response = await axios.get(url);
        console.log(`Our response look like ${response}`);
        console.log(`Our response data look like ${response.data}`);
        return response.data.meals || [];

    }
}