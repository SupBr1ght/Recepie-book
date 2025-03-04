import { useEffect, useState } from "react";
import { fetchMeals } from "./services/api";
import { Meal } from "./services/Meal";
import MealList from "./pages/MealList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IngredientPage from "./pages/ReceiptInfoPage";

function App() {
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    fetchMeals().then(setMeals).catch(console.error);
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MealList />} />
          <Route path="/info/:id" element={<IngredientPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
