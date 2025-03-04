import { Router } from "express";
import { MealController } from "../controller/mealController";

const router = Router();

router.get('/:id', MealController.getInfoAboutMeals)

export default router