import express from "express";
import mealRoutes from "./routes/mealRoutes";
import infoRoutes from "./routes/infoRoutes";
import cors from 'cors'
import dotenv from 'dotenv';

dotenv.config();


console.log("🚀 CORS_ORIGIN from .env:", process.env.CORS_ORIGIN);

const allowedOrigins = process.env.CORS_ORIGIN
? process.env.CORS_ORIGIN.split(",").map(origin => origin.trim().replace(/\/$/, ""))
: [];


const app = express(); 
const port =  process.env.PORT || 4000
const front_port = process.env.FRONT_PORT

app.use(cors({
  origin: allowedOrigins,
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
