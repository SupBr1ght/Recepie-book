import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSpecMeal } from "../services/api";
import { Meal } from "../services/Meal";

const ReceiptInfoPage = () => {
  const { idMeal } = useParams<{ idMeal?: string }>();
  console.log("ID from useParams:", idMeal); // 🟢 Додаємо лог
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("🔥 ID from useParams:", idMeal);
    if (!idMeal) {
      setError("Id isn't specified");
      setLoading(false);
      return;
    }
    const loadMeal = async () => {
      try {
        console.log("🚀 Fetching meal info...");
        const data = await fetchSpecMeal(idMeal);
        console.log("🟢 API Response:", data);
        setMeal(data[0]);
        console.log("🔥 ID from useParams:", data.idMeal);
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
  if (!meal) return <p>Ingredient not found</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-6">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-64 h-64 object-cover rounded-lg shadow-md"
        />

        <div className="text-center flex flex-col items-center">
          <h2 className="text-3xl font-bold">
            {meal.strMeal || "name is undefined"}
          </h2>
          <Link
            to={`/area/${meal.strArea}`}
            className="text-blue-500 hover:underline mt-2"
          >
            {meal.strArea}
          </Link>
        </div>
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-2xl font-semibold mb-2">Instructions</h3>
        <p className="text-gray-700">
          {meal.strInstructions || "instruction is undefined"}
        </p>
      </div>
      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-center">Ingredients</h3>
        <ul className="grid grid-cols-2 gap-2 mt-4 text-center">
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
            const ingredient = `strIngredient${num}` as keyof Meal;
            if (!ingredient) return null;
            return (
              <li key={num}>
                <Link
                  to={`/ingredient/${ingredient}`}
                  className="text-blue-500 hover:underline"
                >
                  {ingredient}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ReceiptInfoPage;
