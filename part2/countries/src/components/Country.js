import React from 'react'

const Country = (props) => {
    
    if(!props.details){
        return(
            <li>{props.name}</li>
        )
    } else {
        return(
            <div>
            <h1>{props.name}</h1>
            <p>Capital: {props.capital}</p>
            <p>Population: {props.pop}</p>
            <h3>Languages</h3>
            <ul>
                {props.languages.map(l => <li key={l.name}>{l.name}</li>)}
            </ul>
            <img src={props.flag} alt={props.name}/>
            </div>
        )
    }
}

export default Country