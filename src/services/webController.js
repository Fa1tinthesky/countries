import axios from "axios";

// const base_url = "https://studies.cs.helsinki.fi/restcountries/api/name";
const api_key = import.meta.env.VITE_SOME_KEY;
const 
    base_url = "https://studies.cs.helsinki.fi/restcountries/api/all",
    countryDetailsUrl = "https://studies.cs.helsinki.fi/restcountries/api/name/"

const weather_base_url = "http://api.openweathermap.org/geo/1.0/direct"

const getAll = () => {
    const request = axios.get(base_url);
    return request.then(response => response.data);
}

const getCoordinates = (countryName) => {
    const request = axios.get(`${weather_base_url}?q=${countryName}&limit=5&appid=${api_key}`);
    request.then(response => {
        const weatherReport = response.data;

        return({
            'lat': weatherReport[0]['lat'],
            'lon': weatherReport[0]['lon'],
        })
    });
}

const getWeather = (countryName) => {
    const { lat, lon } = getCoordinates(countryName);
    return({lat, lon});
}

export {
    getAll, 
    getWeather
}