import React from 'react'

const Weather = (props) => {
    const details = props.weather 
    const conditions = details.weather[0]
    const temp = details.main.temp
    const wind = details.wind
    const getWindSpeed = () => `${(wind.speed*3600)/1000} km/h`
    const icon = `http://openweathermap.org/img/wn/${conditions.icon}@2x.png`
    return(
        <div>
            <h2>Weather in {details.name}</h2>
            <p><strong>Temperature: </strong>{temp} Celcius</p>
            <img alt={conditions.description} src={icon}></img>
            <p><strong>Wind: </strong>{getWindSpeed()} {wind.deg} deg</p>
        </div>
    )
}

export default Weather