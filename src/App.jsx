import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("chennai");

  const fetchWeather = async (cityname) => {

    try{
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_KEY}&units=metric`);
      const data = await response.json();
      if(data.cod === '404')
          alert('City Not found..Please try again!')
      else
        setWeatherData(data);

    } catch(e){
      console.log(e);
    }
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
        {weatherData.main && (
          <div className="weather-card">
            <h2 id="cityName">{city}</h2>
            <div id="weather-icon"><img src={`./src/assets/images/${weatherData.weather[0]?.main}.png`} alt="" /></div>
            <h1><span id="temperature">{weatherData.main?.temp}</span>&deg;C</h1>
            <p id="condition">{weatherData.weather[0]?.main}</p>

            <div className="weather-details">
              <div>
                <span><i className="fa-solid fa-droplet"></i> Humidity</span>
                <p><span id="humidity">{weatherData.main?.humidity}</span>%</p>
              </div>
              <div>
                <span><i className="fa-solid fa-wind"></i> Wind</span>
                <p><span id="wind">{weatherData.wind?.speed}</span> km/h</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App
