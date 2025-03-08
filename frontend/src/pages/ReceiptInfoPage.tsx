import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSpecMeal, fetchFilteredMeals } from "../services/api";
import { Meal } from "../types/Meal";
import { motion } from "framer-motion";

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

        if (data[0]?.strCategory) {
          const relatedData = await fetchFilteredMeals(
            "category",
            data[0].strCategory
          );
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

  if (loading)
    return <p className="text-center text-lg text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!meal)
    return <p className="text-center text-gray-500">Recipe not found</p>;

  return (
    <div className="p-6 md:pl-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
      <div className="flex-1 w-full">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-80 h-80 object-cover rounded-lg shadow-lg"
          />
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900">
              {meal.strMeal || "Name is undefined"}
            </h2>
            <Link
              to={`/filter/country/${meal.strArea}`}
              className="inline-block mt-2 text-lg font-medium text-blue-600 hover:text-blue-800 transition-all duration-300 relative group"
            >
              {meal.strArea}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>

        <div className="mt-4 text-left">
          <h3 className="text-2xl font-semibold mb-3 text-center md:text-left">
            Instructions
          </h3>
          {meal.strInstructions ? (
            <div className="text-gray-700 space-y-4 leading-relaxed">
              {meal.strInstructions.split(". ").map((sentence, index) => (
                <p key={index}>{sentence}.</p>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Instructions are not available.</p>
          )}
        </div>
      </div>

      <aside className="w-full md:w-96 bg-white/30 backdrop-blur-md p-5 rounded-lg shadow-lg border border-white/20">
        <h3 className="text-xl font-semibold mb-3">
          📌 Other recipes from {meal.strCategory || "this category"}
        </h3>
        <ul className="space-y-3">
          {relatedMeals
            .filter((relatedMeal) => relatedMeal.idMeal !== meal.idMeal)
            .map((relatedMeal) => (
              <motion.li
                key={relatedMeal.idMeal}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to={`/meal/${relatedMeal.idMeal}`}
                  className="block bg-white p-3 rounded-md shadow-sm hover:bg-gray-200 hover:shadow-md transition"
                >
                  {relatedMeal.strMeal}
                </Link>
              </motion.li>
            ))}
        </ul>
      </aside>
    </div>
  );
};

export default ReceiptInfoPage;
