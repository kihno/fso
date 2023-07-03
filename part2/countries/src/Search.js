import { useState, useEffect } from "react";
import Results from './Results';

const Search = (props) => {
    const { countries } = props;
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])

    useEffect(() => {
        let searchMatch = []

        countries.map(country => {
            if (country.name.common.toLowerCase().includes(search)) {
                searchMatch.push(country)
            }
        })

        setResults(searchMatch)
    }, [search])

    const handleInput = (e) => {
        setSearch(e.target.value.toLowerCase())
    }

    return (
        <div>
            <div className='search'>find countres <input value={search} onChange={handleInput} /></div>
            <Results results={results} setResults={setResults} />
        </div>
    )
}

export default Search
