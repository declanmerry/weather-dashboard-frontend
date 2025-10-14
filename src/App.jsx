import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    const res = await fetch(`http://127.0.0.1:8000/weather/${city}`);
    const data = await res.json();
    setWeather(data);
  };

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
          <p>Temperature: {weather.current_weather?.temperature}°C</p>
          <p>Wind Speed: {weather.current_weather?.windspeed} km/h</p>
        </div>
      )}
    </div>
  );
}

export default App;