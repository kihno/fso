import { useState, useEffect } from 'react';
import axios from 'axios';
import Search from "./Search";

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <div className="App">
      <Search countries={countries} />
    </div>
  );
}

export default App;
