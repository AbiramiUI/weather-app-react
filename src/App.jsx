import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  
  const [city, setCity] = useState("chennai");
  const [temperature, setTemperature] = useState(null);
  const [condition, setCondition] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);

  const fetchWeather = async (cityname) => {
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_KEY}&units=metric`)
      .then(res => res.json())
      .then(data => {
        setTemperature(data.main.temp);
        setCondition(data.weather[0].main);
        setHumidity(data.main.humidity);
        setWind(data.wind.speed);
      })
  }

  useEffect(() => {
    fetchWeather(city);
  }, []);


  return (
    <>
      <div className="weather-container">
        <h1>Weather App!</h1>
        <div className="search-box">
          <input type="text" id="city" placeholder="Enter City Name" onChange={(e) => setCity(e.target.value)} autoComplete='off' />
          <button id="searchBtn" onClick={() => fetchWeather(city)}>Search</button>
        </div>
        <div className="weather-card">
          <h2 id="cityName">{city}</h2>
          <div id="weather-icon"><img src={`../src/assets/images/${condition}.png`} alt="" /></div>
          <h1><span id="temperature">{temperature}</span>&deg;C</h1>
          <p id="condition">{condition}</p>

          <div className="weather-details">
            <div>
              <span><i className="fa-solid fa-droplet"></i> Humidity</span>
              <p><span id="humidity">{humidity}</span>%</p>
            </div>
            <div>
              <span><i className="fa-solid fa-wind"></i> Wind</span>
              <p><span id="wind">{wind}</span> km/h</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
