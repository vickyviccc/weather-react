import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  const apiKey = "e450bc345a80a08ada69fd5c714d871d";

  // Handle form submission to fetch weather data
  function handleSubmit(event) {
    event.preventDefault();

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Fetch current weather data
    axios.get(apiUrl).then(handleResponse);
  }

  // Handle the response for current weather data
  function handleResponse(response) {
    setWeather({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      city: response.data.name,
      date: new Date(response.data.dt * 1000).toLocaleString(),
    });

    // Fetch 5-day forecast data
    let forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${response.data.name}&appid=${apiKey}&units=metric`;
    axios.get(forecastApiUrl).then(handleForecastResponse);
  }

  function handleForecastResponse(response) {
  console.log("Forecast API Response:", response.data); // Log the full API response

  let dailyForecasts = [];

  // Select one forecast per day (closest to noon)
  response.data.list.forEach((forecastData) => {
    let forecastDate = new Date(forecastData.dt * 1000);
    let forecastHour = forecastDate.getHours();
    
    // Choose forecasts between 12:00 and 15:00
    if (forecastHour >= 12 && forecastHour <= 15) {
      dailyForecasts.push({
        date: forecastDate.toLocaleDateString(),
        icon: `http://openweathermap.org/img/wn/${forecastData.weather[0].icon}@2x.png`,
        temp: Math.round(forecastData.main.temp),
        description: forecastData.weather[0].description,
      });
    }
  });

  console.log("Processed Forecast Data:", dailyForecasts); // Log the processed forecast

  setForecast(dailyForecasts); // Set forecast data in state
}


  // Handle input changes for the city
  function handleCityChange(event) {
    setCity(event.target.value);
  }

  return (
  <div className="container">
    <div className="weather-react-wrapper">
      <div className="weather-react">
        <form id="search-form" className="mb-3" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a city"
                className="form-control"
                id="city-input"
                onChange={handleCityChange}
              />
            </div>
            <div className="col-3">
              <input type="submit" value="Search" className="btn btn-primary w-100" />
            </div>
          </div>
        </form>

        {weather && (
          <div className="overview">
            <h1>{weather.city}</h1>
            <ul>
              <li>Last updated: {weather.date}</li>
              <li>{weather.description}</li>
            </ul>
            <div className="row">
              <div className="col-md-6">
                <div className="clearfix weather-temperature">
                  <img
                    src={weather.icon}
                    alt={weather.description}
                    id="icon"
                    className="float-left"
                  />
                  <div className="float-left">
                    <strong id="temperature">{Math.round(weather.temperature)}</strong>
                    <span className="units">°C</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <ul>
                  <li>Humidity: {weather.humidity}%</li>
                  <li>Wind: {Math.round(weather.wind)} km/h</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {console.log("Forecast data:", forecast)}

        {/* Make sure forecast is wrapped inside the main container */}
        {forecast.length > 0 && (
          <div className="forecast">
            <h2>5-Day Forecast</h2>
            <div className="row">
              {forecast.map((item, index) => (
                <div className="col-2" key={index}>
                  <p>{item.date}</p>
                  <img src={item.icon} alt={item.description} />
                  <p>{item.temp}°C</p>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <small>
          <a href="https://github.com/vickyviccc/weather-app" target="_blank" rel="noreferrer">
            Open-source code
          </a>{" "}
          by Vicky Stutter
        </small>
      </div>
    </div>
  </div>
);}
