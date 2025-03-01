import { Request, Response } from "express";
import { MealService } from "../services/mealService";
export class MealController{
    static async getMeals(req: Request, res: Response): Promise<void> {
        try {
            console.log(`Controller get request: ${req.url} 🤖`); // our request 

            const filters = req.query; // this is our request query params

            const meals  = await MealService.fetchMeals(filters) // push our query params to the server
            res.json(meals)
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch meals ❌" });
        }
    }
}