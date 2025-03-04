import { useEffect, useState } from "react";
import { fetchMeals } from "./services/api";
import { Meal } from "./types/Meal";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IngredientPage from "./pages/ReceiptInfoPage";
import ReceiptInfoPage from "./pages/ReceiptInfoPage";
import HomePage from "./pages/HomePage";
import MealList from "./pages/MealList";

function App() {
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    fetchMeals().then(setMeals).catch(console.error);
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/info/:id" element={<IngredientPage />} />
          <Route
            path="/filter/:filterType/:filterValue"
            element={<MealList />}
          />
          <Route path="/meal/:idMeal" element={<ReceiptInfoPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
