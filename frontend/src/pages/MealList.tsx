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
      const data = await fetchFilteredMeals(
        filterType as "country" | "ingredient" | "category",
        filterValue
      );

      try {
        const data = await fetchFilteredMeals(
          filterType as "country" | "ingredient" | "category",
          filterValue
        );

        if (!data || data.length === 0) {
          setError("❌ Nothing found");
        } else {
          setMeals(data);
          setError(null);
        }
      } catch (err) {
        setError("❌ Error in fetching data");
      } finally {
        setLoading(false);
      }
      setMeals(data);
      setLoading(false);
    };

    loadMeals();
  }, [filterType, filterValue]);

  if (!filterType || !filterValue)
    return <p className="text-center">❌ We don't have filter parameters</p>;

  const pageTitle =
    filterType === "country"
      ? `Recepie from country: ${filterValue}`
      : filterType === "ingredient"
      ? `Recepie for ingridient: ${filterValue}`
      : `Recepie on category: ${filterValue}`;

  return (
    <div className="flex flex-col items-center space-y-4 p-6 shadow-lg rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-purple-900 pt-10 border-purple-500 pb-2">
        {pageTitle}
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="w-full">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 max-h-[600px] overflow-y-auto bg-cyan-100 rounded-lg shadow-inner">
            {meals.map((meal) => (
              <li key={meal.idMeal} className="w-full">
                <Link
                  to={`/meal/${meal.idMeal}`}
                  className="block bg-purple-300 hover:bg-purple-400 text-purple-900 font-semibold p-4 rounded-lg text-center transition transform hover:scale-105"
                >
                  {meal.strMeal}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
