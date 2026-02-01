const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function getWeatherByCity(city) {
  const response = await fetch(
    `${BASE_URL}?q=${city}&units=metric&lang=pt&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Erro ao obter dados meteorológicos");
  }

  return await response.json();
}
