import { fetchFilteredMeals } from "../services/api";
import { Meal } from "../types/Meal";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";



export default function MealList() {
  const { filterType, filterValue } = useParams<{
    filterType?: string;
    filterValue?: string;
  }>();

  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!filterType || !filterValue) return;

    const loadMeals = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchFilteredMeals(
          filterType as "country" | "ingredient" | "category",
          filterValue
        );

        if (!data || data.length === 0) {
          setError("❌ No meals found.");
          setMeals([]);
        } else {
          setMeals(data);
        }
      } catch {
        setError("❌ Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    loadMeals();
  }, [filterType, filterValue]);

  if (!filterType || !filterValue)
    return <p className="text-center text-lg text-red-500">❌ No filter parameters provided.</p>;

  const pageTitle =
    filterType === "country"
      ? `Recipes from ${filterValue}`
      : filterType === "ingredient"
      ? `Recipes with ${filterValue}`
      : `Recipes in category: ${filterValue}`;

  return (
    <div className="flex flex-col items-center space-y-6 p-8 max-w-7xl mx-auto">
      {/* Заголовок сторінки */}
      <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-wide">
        {pageTitle}
      </h2>

      {/* Контент (лінкер або список страв) */}
      {loading ? (
        <p className="text-lg text-gray-600 dark:text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-lg text-red-500">{error}</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {meals.map((meal) => (
            <li key={meal.idMeal} className="w-full">
              <Link
                to={`/meal/${meal.idMeal}`}
                className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 text-white text-lg font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                🍽 {meal.strMeal}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
