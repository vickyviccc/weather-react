import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

export default function Weather() {
  // Use state to store the city and the weather data
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  // Handle form submit
  function handleSubmit(event) {
    event.preventDefault();
    // Fetch the weather data when the form is submitted
    let apiKey = "e450bc345a80a08ada69fd5c714d871d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(handleResponse);
  }

  // Handle the API response
  function handleResponse(response) {
    setWeather({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      city: response.data.name,
      date: new Date(response.data.dt * 1000).toLocaleString(),
    });
  }

  // Handle input changes
  function handleCityChange(event) {
    setCity(event.target.value);
  }

  return (
    <div className="container">
      <div className="weather-app-wrapper">
        <div className="weather-app">
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
        </div>
        <small>
          <a href="https://github.com/vickyviccc/weather-app" target="_blank" rel="noreferrer">
            Open-source code
          </a>{" "}
          by Vicky Stutter
        </small>
      </div>
    </div>
  );
}
