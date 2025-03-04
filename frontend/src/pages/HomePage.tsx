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
    <div className="flex flex-col items-center space-y-6 p-6 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-purple-900 pt-10 pb-4">
        List all recepies
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : meals.length === 0 ? (
        <p className="text-center">❌ No meals found</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-gray-800 bg-cyan-600 p-4 rounded-md w-full max-w-6xl">
          {meals.map((meal) => (
            <li key={meal.idMeal} className="w-full">
              <Link
                to={`/meal/${meal.idMeal}`}
                className="flex items-center gap-2 p-3 rounded-md bg-purple-300 w-full hover:bg-purple-400 transition shadow-md text-center justify-center"
              >
                {meal.strMeal}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
