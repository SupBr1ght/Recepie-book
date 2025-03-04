import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSpecMeal, fetchFilteredMeals } from "../services/api";
import { Meal } from "../types/Meal";

const ReceiptInfoPage = () => {
  const { idMeal } = useParams<{ idMeal?: string }>();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedMeals, setRelatedMeals] = useState<Meal[]>([]);

  useEffect(() => {
    if (!idMeal) {
      setError("Id isn't specified");
      setLoading(false);
      return;
    }

    const loadMeal = async () => {
      try {
        const data = await fetchSpecMeal(idMeal);
        setMeal(data[0]);

        // Якщо у нас є категорія, фільтруємо інші рецепти з тієї ж категорії
        if (data[0]?.strCategory) {
          const relatedData = await fetchFilteredMeals("category", data[0].strCategory);
          setRelatedMeals(relatedData);
        }
      } catch (err) {
        setError("Can't get the data");
      } finally {
        setLoading(false);
      }
    };

    loadMeal();
  }, [idMeal]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!meal) return <p>Recipe not found</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <div className="flex items-center gap-6">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-64 h-64 object-cover rounded-lg shadow-md"
          />
          <div className="text-center flex flex-col items-center">
            <h2 className="text-3xl font-bold">{meal.strMeal || "name is undefined"}</h2>
            <Link to={`/filter/country/${meal.strArea}`} className="text-blue-500 hover:underline mt-2">
              {meal.strArea}
            </Link>
          </div>
        </div>
        <div className="mt-6 text-center">
          <h3 className="text-2xl font-semibold mb-2">Instructions</h3>
          <p className="text-gray-700">{meal.strInstructions || "instruction is undefined"}</p>
        </div>
      </div>

      <aside className="w-full md:w-80 bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-3">📌 Інші рецепти з {meal.strCategory}</h3>
        <ul className="space-y-2">
          {relatedMeals
            .filter((relatedMeal) => relatedMeal.idMeal !== meal.idMeal) 
            .map((relatedMeal) => (
              <li key={relatedMeal.idMeal} className="bg-white p-2 rounded-md shadow hover:bg-gray-200">
                <Link to={`/meal/${relatedMeal.idMeal}`} className="text-blue-500 hover:underline">
                  {relatedMeal.strMeal}
                </Link>
              </li>
            ))}
        </ul>
      </aside>
    </div>
  );
};

export default ReceiptInfoPage;
