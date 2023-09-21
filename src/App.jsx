import { useEffect, useState } from 'react'
import * as webController from './services/webController';


const SearchBar = ({ countries }) => {
  const [newCountry, setNewCountry] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  const handleChange = (e) => {
    const currentCountry = e.target.value.toLowerCase();
    setNewCountry(currentCountry);

    setFilteredCountries(countries.filter(item => 
      item.name.toLowerCase().includes(currentCountry))
    ); 
  }

  const showCountry = (country) => {
    setFilteredCountries([country]); 
    setNewCountry(country.name)
  }


  if (filteredCountries.length > 10) {
    return(
      <div>
        <input type="text" value={newCountry} onChange={handleChange}/>
        <p>Too much matches, please specify another filter</p>
      </div>
    );
  } else if (filteredCountries.length == 1) {
    const country = countries.filter(item => 
      item['name'].toLowerCase() == filteredCountries[0].name.toLowerCase()
    )[0];


    console.log(`Chosen country`, country);
    return(
      <div>
        <input type="text" value={newCountry} onChange={handleChange}/>
        <h1>{country.name}</h1>
        <p>capital: {country.capital}</p>
        <p>area {country.area} km2</p>
        <div>
          <h2>languages:</h2>
          <ul>
            {country['languages'].map(language => <li key={language}>{language}</li> )}
          </ul>
        </div>
        <div style={{fontSize: 200}}>{country['flag']}</div>
     </div>
    );
  } else {
    return(
      <div>
        <input type="text" value={newCountry} onChange={handleChange}/>
        <ul>
          {filteredCountries.map(item => 
            <li key={item.id}>
              <p>{item.name}</p>
              <button onClick={() => showCountry(item)}>show</button>
            </li>
          )}
        </ul>
      </div>
    );
  }


}

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
      webController.getAll()
        .then(intialCountries => {
          setCountries(intialCountries.map((item) => {
            let 
                countryName = item['name']['common'],
                capital = (item['capital'] === undefined) ? "No capital" : item['capital'][0],
                area = (item['area'] === undefined) ? 'Unset' : item['area'],
                languages = [],
                flag = item['flag']

            if (item['languages']) {
              Object.keys(item['languages']).forEach((key) => {
                languages.push(item['languages'][key]);
              })
            } else {
              console.log("False language :D");
              languages.push('No language determined');
            }
            
            return {
              name: countryName,
              "capital": capital,
              "area": area,
              "languages": languages,
              "flag": flag,
              id: countryName
            };
          }));
        })
  }, []);
  

  return (
    <div>
      <SearchBar countries={countries}/>
    </div>
  )
}

export default App
