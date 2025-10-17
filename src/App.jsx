import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  // Remove trailing slash from backend URL
  const backendUrl = import.meta.env.VITE_API_URL.replace(/\/+$/, "");
  const normalizedCity = city.trim().toLowerCase();



const fetchWeather = async () => {
    setError(null);
    setWeather(null);

    const normalizedCity = city.trim().toLowerCase();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/weather/${normalizedCity}`);
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError("Unable to fetch weather data. Please try again.");
    }
  };

 
  const displayCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, textAlign: "center" }}>
      <h1>🌤️ Weather Dashboard</h1>
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
  );
}

export default App;
