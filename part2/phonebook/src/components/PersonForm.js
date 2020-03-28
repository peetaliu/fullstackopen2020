import React from 'react'
import PersonsService from '../services/PersonsService'

const PersonForm = (props) =>{

    const addName = (e) => {
        e.preventDefault()
        const allNames = () => props.persons.map(p => p.name.toUpperCase())
        const allNum = () => props.persons.map(p => p.number)
        if (!props.newName.trim() || !props.newNumber.trim()) {
            window.alert('Text boxes cannot be empty')
        } else {
            if (allNames().includes(props.newName.trim().toUpperCase())) {
                window.alert(`${props.newName} already exists in the phonebook. Please use a different name.`)
            } else if (allNum().includes(props.newNumber.trim())) {
                window.alert(`${props.newNumber} already exists in the phonebook. Please add a different number`)
            } else {
                const personObj = {
                    name: props.newName,
                    number: props.newNumber
                }
                
                PersonsService
                    .create(personObj)
                    .then(res => {
                        props.setPersons(props.persons.concat(res.data))
                        props.setNewName('')
                        props.setNewNumber('')
                })
            }
        }
    }

return(
    <form onSubmit={addName}>
        <div>
            name: <input value={props.newName} onChange={props.handleNameChange}/>
        </div>
        <div>
            number: <input value={props.newNumber} onChange={props.handleNumChange}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>

)
}
export default PersonForm