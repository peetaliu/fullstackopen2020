import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { 
        name: 'Arto Hellas' 
    }
  ]) 
  const [ newName, setNewName ] = useState('')

  const showNames = () => persons.map(p =>
        <Person 
            key={p.name}
            person={p}
        />
  )
  const addName = (e) => {
      e.preventDefault()

      const allNames = () => persons.map(p => p.name.toUpperCase())
      
      if(allNames().includes(newName.trim().toUpperCase())){
        window.alert(`${newName} is already in the phonebook. Please use a different name.`)
      } else {
        const personObj = {
          name: newName
        }
        setPersons(persons.concat(personObj))
        setNewName('')
      }
  }

  const handleNameChange = (e) => {
      //console.log(e.target.value)
      setNewName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {showNames()}
    </div>
  )
}

export default App