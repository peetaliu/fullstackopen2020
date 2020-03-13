import React from 'react'
import Country from './Country'

const Countries = (props) => {
    const countries = props.countries.filter(c => c.name.toLowerCase().includes(props.search.toLowerCase()))

    if(countries.length){
        console.log(countries);
        if(countries.length > 10){
            console.log('Greater than 10');
            return(
                <p>Too many matches, specify another filter</p>
            )
        } else if(countries.length>1){
            console.log('More than 1');
            const showCountryNames = () => countries.map(c => 
                <Country
                details={false} 
                key={c.numericCode} 
                name={c.name} 
                capital={c.capital}
                pop={c.population}
                languages={c.languages}
                flag={c.flag}
                />  
            )
            
            return (
                <div>
                    <ul>
                        {showCountryNames()}
                    </ul>
                </div>
            )
        } else {
            return(
                <Country
                    details={true}
                    name={countries[0].name} 
                    capital={countries[0].capital}
                    pop={countries[0].population}
                    languages={countries[0].languages}
                    flag={countries[0].flag}
                />
            )
        }
    } else {
        return(
            <p>No country data to show. Check api</p>
        )
    }
}

export default Countries