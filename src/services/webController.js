import axios from "axios";

// const base_url = "https://studies.cs.helsinki.fi/restcountries/api/name";
const 
    base_url = "https://studies.cs.helsinki.fi/restcountries/api/all",
    countryDetailsUrl = "https://studies.cs.helsinki.fi/restcountries/api/name/";

const getAll = () => {
    const request = axios.get(base_url);
    return request.then(response => response.data);
}

export {
    getAll
}