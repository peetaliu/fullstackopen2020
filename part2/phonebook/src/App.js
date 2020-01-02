import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


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

      <Filter search={search} handler={handleSearch}/>

      <h3>Add a new</h3>

      <PersonForm 
        persons={persons}
        newName={newName}
        newNumber={newNumber}
        setPersons={setPersons}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        handleNameChange={handleNameChange}
        handleNumChange={handleNumChange}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} search={search} showAll={showAll}/>
    </div>
  )
}

export default App