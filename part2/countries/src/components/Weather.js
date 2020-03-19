import React from 'react'

const Weather = (props) => {
    const details = props.weather 
    console.log(details);
    return(
        <h2>Weather in hello</h2>
    )
}

export default Weather