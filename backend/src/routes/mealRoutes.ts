import { Router } from "express";
import { MealController } from "../controller/mealController";

const router = Router();

router.get('/meals', MealController.getMeals)

export default router