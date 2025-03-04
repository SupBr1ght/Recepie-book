import express from "express";
import mealRoutes from "./routes/mealRoutes";
import infoRoutes from "./routes/infoRoutes";
import cors from 'cors'

const app = express(); // Створюємо сервер
const port = 3000;

app.use(cors({
  origin: "http://localhost:5173", // 👈 Дозволяємо запити тільки з фронтенду
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

// Middleware for JSON parsing
app.use(express.json());

app.use('/meals', mealRoutes)
app.use('/info', infoRoutes )


app.get('/', (req, res)=>{
  res.send("Hello");
})

app.listen(port, () => {
  console.log(`🚀 Server works on http://localhost:${port}`);
});

export default app;
