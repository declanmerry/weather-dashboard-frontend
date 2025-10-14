import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;
    const normalizedCity = city.trim().toLowerCase();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/weather/${normalizedCity}`);
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      console.error("Error fetching weather:", err);
    }
  };

  const displayCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>🌤️ Weather Dashboard</h1>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={fetchWeather}>Get Weather</button>
      {weather && (
        <div>
          <p>Weather for {displayCity}</p>
          <p>Temperature: {weather.current_weather?.temperature}°C</p>
          <p>Wind Speed: {weather.current_weather?.windspeed} km/h</p>
        </div>
      )}
    </div>
  );
}

export default App;
