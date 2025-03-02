import { useEffect, useState } from "react";
import { fetchMeals } from "./services/api";
import { Meal } from "./services/Meal";
function App() {
    const [meals, setMeals] = useState<Meal[]>([]);

    useEffect(() => {
        fetchMeals().then(setMeals).catch(console.error);
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Recipes</h1>
            <ul>
                {meals.map((meal) => (
                    <li key={meal.idMeal}>{meal.strMeal}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
