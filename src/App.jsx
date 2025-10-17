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

// Particle styles based on weather
const particleOptions = {
  clear: {
    // light, subtle sparkle for clear sky
    //background: { color: "#87CEEB" }, // soft blue sky
    particles: {
      number: { value: 30 },
      color: { value: "#fff" },
      size: { value: 2 },
      move: { speed: 0.5, direction: "top", outMode: "out" },
      opacity: { value: 0.7 },
    },
  },
  cloud: {
    background: { color: "#bdc3c7" }, // grey sky
    particles: {
      number: { value: 40 },
      color: { value: "#ecf0f1" },
      shape: { type: "circle" },
      size: { value: 20 },
      move: { speed: 0.2, direction: "top", outMode: "out" },
      opacity: { value: 0.3 },
    },
  },
  rain: {
    background: { color: "#2c3e50" }, // dark rain sky
    particles: {
      number: { value: 200 },
      color: { value: "#3498db" },
      shape: { type: "line" },
      size: { value: 2 },
      move: { speed: 25, direction: "bottom", straight: true, outMode: "out" },
      opacity: { value: 0.5 },
    },
  },
  snow: {
    background: { color: "#ecf0f1" }, // light snowy sky
    particles: {
      number: { value: 100 },
      color: { value: "#fff" },
      shape: { type: "circle" },
      size: { value: 4 },
      move: { speed: 1, direction: "bottom", outMode: "out" },
      opacity: { value: 0.8 },
    },
  },
  thunder: {
    background: { color: "#2f3640" }, // dark storm
    particles: {
      number: { value: 50 },
      color: { value: "#f1c40f" },
      size: { value: 8 },
      move: { speed: 10, direction: "random", outMode: "out" },
      opacity: { value: 1 },
    },
  },
  mist: {
    background: { color: "#95a5a6" }, // foggy sky
    particles: {
      number: { value: 60 },
      color: { value: "#bdc3c7" },
      shape: { type: "circle" },
      size: { value: 15 },
      move: { speed: 0.3, direction: "top", outMode: "out" },
      opacity: { value: 0.2 },
    },
  },
  default: {
    background: { color: "#34495e" }, // fallback
    particles: { number: { value: 0 } },
  },
};



return (
     <div
  style={{
    position: "relative",
    height: "100vh",
    overflow: "hidden",
    background: particleOptions[weatherType].background.color,
  }}
>
  <Particles id="tsparticles" options={particleOptions[weatherType]} />
  
  <div
    style={{
      position: "absolute",
      top: 0,
      width: "100%",
      textAlign: "center",
      color: "#fff",
      padding: "2rem",
      zIndex: 10, // bring content above particles
    }}>
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
