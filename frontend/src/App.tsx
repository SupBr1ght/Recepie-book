import { useEffect, useState } from "react";
import { fetchMeals } from "./services/api";
import { Meal } from "./services/Meal";
import MealList from "./pages/MealList";
function App() {
    const [meals, setMeals] = useState<Meal[]>([]);

    useEffect(() => {
        fetchMeals().then(setMeals).catch(console.error);
    }, []);

    return (
        <MealList/>
    );
}

export default App;
