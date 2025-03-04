import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchFilteredMeals } from "../services/api";
import { Link } from "react-router-dom";

const RecipeListPage = () => {
  const { filterType, filterValue } = useParams<{
    filterType?: string;
    filterValue?: string;
  }>();
  const [meals, setMeals] = useState<{ idMeal: string; strMeal: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!filterType || !filterValue) return;

    const loadMeals = async () => {
      try {
        console.log(`🔍 Запитуємо дані для: ${filterType} = ${filterValue}`);
        const data = await fetchFilteredMeals(
          filterType as "country" | "ingredient" | "category",
          filterValue
        );

        if (!data || data.length === 0) {
          setError("❌ Рецептів не знайдено.");
        } else {
          setMeals(data);
          setError(null);
        }
      } catch (err) {
        setError("❌ Помилка отримання даних.");
      }
    };

    loadMeals();
  }, [filterType, filterValue]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">
        {filterType === "country"
          ? `recept value : ${filterValue}`
          : `recept wih country:  ${filterValue}`}
      </h2>
      <ul className="grid grid-cols-2 gap-4">
        {meals.map((meal) => (
          <li key={meal.idMeal}>
            <Link
              to={`/filter/${filterType}/${filterValue}`}
            
              className="text-blue-500 hover:underline"
            >
             
              {meal.strMeal}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeListPage;
