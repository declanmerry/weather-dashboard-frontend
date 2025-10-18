import { useState, useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // smaller bundle, still works great
//import { loadFull } from "@tsparticles/full"; 

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [weatherType, setWeatherType] = useState("default");
  const [error, setError] = useState(null);

  // 🧩 Initialize the tsParticles engine
const particlesInit = useCallback(async (engine) => {
  console.log("tsParticles engine loaded:", engine);
  await loadSlim(engine); // ✅ loadSlim for lightweight version
}, []);


  const fetchWeather = async () => {
    setError(null);
    setWeather(null);
    try {
      const baseUrl = import.meta.env.VITE_API_URL.replace(/\/$/, "");
      const res = await fetch(`${baseUrl}/weather/${city.toLowerCase()}`);
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      const description = data.open_weather?.weather;
      const type = getWeatherType(description);
      console.log("Weather type:", type);
      setWeatherType(type);
      setWeather(data);
    } catch {
      setError("Unable to fetch weather data. Please try again.");
    }
  };

  const getWeatherType = (description) => {
    if (!description) return "default";
    const lower = description.toLowerCase();
    if (lower.includes("rain") || lower.includes("drizzle")) return "rain";
    if (lower.includes("cloud") || lower.includes("clouds")) return "cloud";
    if (lower.includes("snow")) return "snow";
    if (lower.includes("clear")) return "clear";
    if (lower.includes("thunder")) return "thunder";
    if (lower.includes("mist") || lower.includes("fog") || lower.includes("haze")) return "mist";
    return "default";
  };

  // ✨ Simple visible test particles
  const particleOptions = {
    background: { color: "#1e1e1e" },
    particles: {
      number: { value: 60 },
      size: { value: 3 },
      color: { value: "#ffffff" },
      move: { enable: true, speed: 1 },
      opacity: { value: 0.6 },
    },
  };

  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw", overflow: "hidden" }}>
      {/* Background particles */}
      <Particles
        id="tsparticles"
        init={particlesInit} // ✅ required
        options={particleOptions}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />

      {/* Foreground UI */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          color: "#fff",
          paddingTop: "5rem",
        }}
      >
        <h1>🌦️ Weather Dashboard</h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            width: "70%",
            maxWidth: 600,
            margin: "2rem auto",
          }}
        >
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            style={{
              padding: 10,
              flexGrow: 1,
              minWidth: 200,
              marginRight: 10,
              marginBottom: 10,
              borderRadius: 4,
              border: "none",
            }}
          />
          <button
            onClick={fetchWeather}
            style={{
              padding: "10px 20px",
              borderRadius: 4,
              border: "none",
              cursor: "pointer",
              backgroundColor: "#3498db",
              color: "#fff",
            }}
          >
            Get Weather
          </button>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {weather && (
          <div style={{ marginTop: 20 }}>
            <h2>Weather for {weather.city}</h2>

            {weather.open_meteo && (
              <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 10, marginBottom: 10 }}>
                <h3>Open-Meteo</h3>
                <p>Temperature: {weather.open_meteo.temperature ?? "N/A"}°C</p>
                <p>Wind Speed: {weather.open_meteo.windspeed ?? "N/A"} km/h</p>
              </div>
            )}

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
