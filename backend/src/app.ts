import express from "express";
import mealRoutes from "./routes/mealRoutes";
import infoRoutes from "./routes/infoRoutes";

const app = express(); // Створюємо сервер
const port = 3000;

// Middleware for JSON parsing
app.use(express.json());

app.use('/meals', mealRoutes)
app.use('/info', infoRoutes )


app.get('/', (req, res)=>{
  res.send("Hello");
})

// Запускаємо сервер
app.listen(port, () => {
  console.log(`🚀 Server works on http://localhost:${port}`);
});

export default app;
