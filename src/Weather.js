import React from "react";
import axios from 'axios';




export default function Weather(props) {

    console.log("Props received:", props);
    function handleResponse(response) {
        alert(`The weather in ${response.data.name} is ${response.data.main.temp}°C`);
    }

 console.log("City passed as prop:", props.city);


    let apiKey = "e450bc345a80a08ada69fd5c714d871d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${apiKey}&units=metric`;
    console.log("API URL:", apiUrl);

    

    axios.get(apiUrl).then(handleResponse);

    return <h2>Hello from Weather</h2>;
}
