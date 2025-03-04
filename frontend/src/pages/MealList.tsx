import { fetchMeals } from "../services/api";
import { Meal } from "../types/Meal";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MealList() {
  const [meals, setMeals] = useState([]); // saved rendered data to the array
  const [loading, setLoading] = useState(true); // Стан для індикатора завантаження

  useEffect(() => {
    const loadMeals = async () => {
      try {
        const data = await fetchMeals();
        setMeals(data);
      } catch (error) {
        console.log("Error fetching meals:", error);
      } finally {
        setLoading(false); // Вимкнення індикатора завантаження
      }
    };
    loadMeals();
  }, []);
  return (
    <div className="flex flex-col items-center space-y-2  p-6  shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-purple-900 pt-10 border-purple-500 pb-2">
        Meal List
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="flex flex-col items-center space-y-3 text-gray-800 bg-cyan-600 p-2 rounded-md ">
          {meals.map((meal: Meal) => (
            <li
              key={meal.idMeal}
              className="max-w-xs flex items-center gap-2 p-2 rounded-md bg-purple-300 w-60"
            >
              {" "}
              <Link to={`/meal/${meal.idMeal}`}>
                <span className="w-2 h-2 bg-purple-700 rounded-full"></span>
                {meal.strMeal}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
