import React, {useState} from 'react'

const Country = (props) => {

    const [details, setDetails] = useState(props.details)

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
            
            </div>
            
        )
    }
}

export default Country