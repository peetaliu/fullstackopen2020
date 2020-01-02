import React, { useState } from 'react'
import Person from './components/Person'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(true)

  const personsToShow = showAll
    ? persons
    : persons.filter(p => p.name.toLowerCase().trim().includes(search.toLowerCase()) || p.number.toLowerCase().trim().includes(search.toLowerCase()))

  const showNames = () => personsToShow.map(p => <Person key={p.name} person={p}/>)
  
    
  const addName = (e) => {
      e.preventDefault()
      const allNames = () => persons.map(p => p.name.toUpperCase())
      const allNum = () => persons.map(p => p.number)
      if(!newName.trim() || !newNumber.trim()){
        window.alert('Text boxes cannot be empty')
      } else {
        if(allNames().includes(newName.trim().toUpperCase())){
          window.alert(`${newName} already exists in the phonebook. Please use a different name.`)
        } else if(allNum().includes(newNumber.trim())){
          window.alert(`${newNumber} already exists in the phonebook. Please add a different number`)
        } else {
          const personObj = {
            name: newName,
            number: newNumber
          }
          setPersons(persons.concat(personObj))
          setNewName('')
          setNewNumber('')
      }}
  }

  const handleNameChange = (e) => {
    //console.log(e.target.value)
    setNewName(e.target.value)
  }
  
  const handleNumChange = (e) => {
    //console.log(e.target.value)
    setNewNumber(e.target.value)
  }

  const handleSearch = (e) => {
    if(e.target.value.trim()){
      setShowAll(false)
    } else {
      setShowAll(true)
    }
    setSearch(e.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={search} onChange={handleSearch}/>
      </div>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumChange}/>
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