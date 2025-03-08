import { fetchMeals } from "../services/api";
import { Meal } from "../types/Meal";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMeals = async () => {
      const data = await fetchMeals();
      setMeals(data);
      setLoading(false);
    };

    loadMeals();
  }, []);

  return (
    <div className="flex flex-col items-center space-y-6 p-10 max-w-7xl mx-auto">
      {/* Заголовок */}
      <h1 className="text-4xl font-extrabold text-gray-900 tracking-wide">
        🍽️ Explore Delicious Recipes
      </h1>

      {loading ? (
        <p className="text-xl text-gray-600 ">Loading...</p>
      ) : meals.length === 0 ? (
        <p className="text-center text-lg text-gray-500">❌ No meals found</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {meals.map((meal) => (
            <li key={meal.idMeal} className="w-full">
              <Link
                to={`/meal/${meal.idMeal}`}
                className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 text-white text-lg font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                🍲 {meal.strMeal}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
