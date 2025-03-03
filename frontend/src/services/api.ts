import axios from "axios";
console.log("IMPORT META ENV:", import.meta.env);
console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);

const API_URL = import.meta.env.VITE_API_URL
console.log("ENV VARIABLES:", import.meta.env);
export const fetchMeals = async () => {
    console.log("Fetching meals from:", API_URL);
    const response = await axios.get(`${API_URL}/meals`);
    console.log(response.data);
    return response.data;
};
