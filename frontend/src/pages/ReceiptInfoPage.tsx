import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSpecMeal } from "../services/api";
import { Meal } from "../services/Meal";

const ReceiptInfoPage = () => {
  const { id } = useParams<{ id?: string }>();
  console.log("ID from useParams:", id); // 🟢 Додаємо лог
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Id isn't specified");
      setLoading(false);
      return;
    }
    const loadMeal = async () => {
      try {
        const data = await fetchSpecMeal(id);
        setMeal(data[0]); 
      } catch (err) {
        setError("Can't get the data");
      } finally {
        setLoading(false);
      }
    };

    loadMeal();
  }, [id]);

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>{error}</p>;
  if (!meal) return <p>Інгредієнт не знайдено</p>;

  return (
    <div>
      <h2>{meal.strMeal}</h2>
      <p>Категорія: {meal.strCategory}</p>
      <img src={meal.strMealThumb} alt={meal.strMeal} />
    </div>
  );
};

export default ReceiptInfoPage;
