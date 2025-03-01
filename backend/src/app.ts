import express from "express";
import mealRoutes from "./routes/mealRoutes";

const app = express(); // Створюємо сервер
const port = 3000;

// Middleware for JSON parsing
app.use(express.json());

app.use('/meals', mealRoutes )

// Запускаємо сервер
app.listen(port, () => {
  console.log(`🚀 Server works on http://localhost:${port}`);
});

export default app;
