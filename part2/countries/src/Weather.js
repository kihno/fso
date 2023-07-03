import axios from "axios"
import { useState, useEffect } from "react"

const Weather = (props) => {
    const { capital } = props
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        const API_key = process.env.REACT_APP_API_KEY
        axios
            .get(`http://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=5&appid=${API_key}`)
            .then(response => {
                const lat = response.data[0].lat
                const lon = response.data[0].lon
                return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=imperial`)
            })
            .then(response => {
                setWeather(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [capital])

    const WeatherData = () => {

        return (
            <div>
                <div>Temperature {weather.main.temp} degrees Fahrenheit</div>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
                <div>wind {weather.wind.speed} mph</div>
            </div>
        )
    }

    return (
        <div className='weather'>
            <h3>Weather in {capital}</h3>
            {weather ? <WeatherData /> : null}
        </div>
    )
}

export default Weather
