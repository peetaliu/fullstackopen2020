import React from 'react'

const Weather = (props) => {
    console.log(props.weather);
    return(
        <h2>Weather in {props.weather}</h2>
    )
}

export default Weather