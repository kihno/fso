import Weather from './Weather';

const Results = (props) => {
    const { results, setResults } = props;

    const Display = () => {
        if (results.length > 10) {
            return <p>Too many matches, specify another filter</p>
        } else if (results.length === 1) {
            return (
                <div key={results[0].cca3}>
                    <h1>{results[0].name.common}</h1>
                    <div>capital {results[0].capital}</div>
                    <div>population {results[0].population}</div>
                    <div>area {results[0].area}</div>
                    <h3>languages:</h3>
                    <ul>
                        {Object.values(results[0].languages).map((value, index) => {
                            return <li key={index}>{value}</li>
                        })}
                    </ul>
                    <img src={results[0].flags.png} alt={results[0].flags.alt}></img>
                    <Weather capital={results[0].capital[0]} />
                </div>
            )
        } else {
            return (
                <div className='results'>
                    {results.map(result => {
                        return <div key={result.cca3}>{result.name.common}<button onClick={() => handleShow(result)}>show</button></div>
                    })}
                </div>
            )
        }
    }

    const handleShow = (country) => {
        let countryArray = []
        countryArray.push(country)
        setResults(countryArray)
    }

    return (
        <div className="results">
            <Display />
        </div>
    )
}

export default Results
