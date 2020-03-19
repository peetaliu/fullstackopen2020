import React, {useState} from 'react'
import Weather from './Weather'
import axios from 'axios'

const Country = (props) => {
    const [details, setDetails] = useState(props.details)
    const [weather, setWeather] = useState({})
    const params = {
        access_key: process.env.REACT_APP_WEATHER_KEY,
        query: props.capital
    }

    const handleShow = () => {
        setDetails(!details)
    }

    axios
        .get('http://api.weatherstack.com/current', {params})
        .then(res => {
        setWeather(res.data)
        })

    console.log(weather);

    if(!details){
        return(
            <li>{props.name}<button onClick={handleShow}>show</button></li>
        )
    } else {
        return(
            <div>
            <h1>{props.name}<button onClick={handleShow}>show</button></h1>
            <p>Capital: {props.capital}</p>
            <p>Population: {props.pop}</p>
            <h3>Languages</h3>
            <ul>
                {props.languages.map(l => <li key={l.name}>{l.name}</li>)}
            </ul>
            <img src={props.flag} alt={props.name}/>
            
            <Weather weather={weather}/>
            </div>
            
        )
    }
}

export default Country