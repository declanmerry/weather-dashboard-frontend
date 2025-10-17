import { useState } from "react";
import Particles from "react-tsparticles";




function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [weatherType, setWeatherType] = useState("default");
  const [error, setError] = useState(null);
  // Remove trailing slash from backend URL
  const backendUrl = import.meta.env.VITE_API_URL.replace(/\/+$/, "");
  const normalizedCity = city.trim().toLowerCase();

const displayCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

const fetchWeather = async () => {
    setError(null);
    setWeather(null);

    const normalizedCity = city.trim().toLowerCase();
    try {
      const baseUrl = import.meta.env.VITE_API_URL.replace(/\/$/, ""); // remove trailing slash if any
      const res = await fetch(`${baseUrl}/weather/${city.toLowerCase()}`);
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
      setWeatherType(getWeatherType(data.open_weather?.weather));
    } catch (err) {
      setError("Unable to fetch weather data. Please try again.");
    }
  };
 
const getWeatherType = (description) => {
  if (!description) return "default";

  const lower = description.toLowerCase();

  if (lower.includes("rain") || lower.includes("drizzle")) return "rain";
  if (lower.includes("cloud")) return "cloud";
  if (lower.includes("snow")) return "snow";
  if (lower.includes("clear")) return "clear";
  if (lower.includes("thunder")) return "thunder";
  if (lower.includes("mist") || lower.includes("fog") || lower.includes("haze")) return "mist";

  return "default";
};

return (
     <div
  style={{
    position: "relative",
    height: "100vh",
    overflow: "hidden",
    //background: "#f0f0f0", // light grey, or "#87CEEB" for blue sky
    color: "#000",          // black text for visibility
    paddingTop: "2rem",
    textAlign: "center",
  }}
>
  
  
  <div style={{ top: 0, width: "100%", textAlign: "center", color: "#fff", padding: "2rem", zIndex: 10 }}>
      <h1>🌦️ Weather Dashboard</h1>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        style={{ padding: 10, width: "70%", marginRight: 10 }}
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: 20 }}>
          <h2>Weather for {weather.city}</h2>

          {/* Open Meteo Data */}
          {weather.open_meteo && (
            <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 10, marginBottom: 10 }}>
              <h3>Open-Meteo</h3>
              <p>Temperature: {weather.open_meteo.temperature ?? "N/A"}°C</p>
              <p>Wind Speed: {weather.open_meteo.windspeed ?? "N/A"} km/h</p>
            </div>
          )}

          {/* OpenWeatherMap Data */}
          {weather.open_weather && (
            <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 10 }}>
              <h3>OpenWeatherMap</h3>
              <p>Temperature: {weather.open_weather.temp ?? "N/A"}°C</p>
              <p>Feels Like: {weather.open_weather.feels_like ?? "N/A"}°C</p>
              <p>Conditions: {weather.open_weather.weather ?? "N/A"}</p>
              <p>Wind Speed: {weather.open_weather.wind_speed ?? "N/A"} km/h</p>
            </div>
          )}
        </div>
      )}
    </div>
  </div>  
);
}

export default App;
