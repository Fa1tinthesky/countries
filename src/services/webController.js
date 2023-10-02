import axios from "axios";

// const base_url = "https://studies.cs.helsinki.fi/restcountries/api/name";
const api_key = import.meta.env.VITE_SOME_KEY;
const 
    base_url = "https://studies.cs.helsinki.fi/restcountries/api/all",
    countryDetailsUrl = "https://studies.cs.helsinki.fi/restcountries/api/name/"

const
    geocodeUrl = "http://api.openweathermap.org/geo/1.0/direct",
    weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";
    // ?lat={lat}&lon={lon}&appid={API key}

const getAll = () => {
    const request = axios.get(base_url);
    return request.then(response => response.data);
}

const getCoordinates = (countryName) => {
    const request = axios.get(`${geocodeUrl}?q=${countryName}&limit=5&appid=${api_key}`);
    let positionObj = {};

    request.then(response => {
        const weatherReport = response.data;

        positionObj.lat = weatherReport[0].lat;
        positionObj.lon = weatherReport[0].lon;
    });

    return(positionObj);
}

const getWeather = (countryName) => {
    let countryPosition = getCoordinates(countryName);
    let weatherReport;

    console.log(`Lat: ${countryPosition['lon']}`);
    const request = axios.get(`${weatherApiUrl}?lat=${countryPosition.lat}&lon=${countryPosition.lon}&appid=${api_key}`);
    request.then(response => {
        weatherReport = response.data;
    })

    console.log(weatherReport);
}

export {
    getAll, 
    getWeather,
}