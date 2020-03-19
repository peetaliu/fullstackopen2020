import React, {useState, useEffect} from 'react'
import Weather from './Weather'
import axios from 'axios'

const Country = (props) => {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${props.capital}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`
    const [details, setDetails] = useState(props.details)
    const [weather, setWeather] = useState({})

    useEffect(()=>{
        axios
        .get(apiURL)
        .then(res => {
         setWeather(res.data)
        })
        .catch(e => {
            console.log(e)
        })
      },[apiURL])

    const handleShow = () => {
        setDetails(!details)
    }

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