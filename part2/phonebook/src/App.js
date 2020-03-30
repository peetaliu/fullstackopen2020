import React, { useState, useEffect } from "react";
import PersonsService from "./services/PersonsService";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notifications from "./components/Notifications";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    PersonsService.getAll().then(res => {
      setPersons(res.data);
    });
  }, []);

  const updateList = () => {
    PersonsService.getAll().then(res => {
      setPersons(res.data);
    });
  };

  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  const handleNumChange = e => {
    setNewNumber(e.target.value);
  };

  const handleSearch = e => {
    if (e.target.value.trim()) {
      setShowAll(false);
    } else {
      setShowAll(true);
    }
    setSearch(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notifications message={msg} />

      <Filter search={search} handler={handleSearch} />

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
        updateList={updateList}
        message={setMsg}
      />

      <h3>Numbers</h3>

      <Persons
        persons={persons}
        search={search}
        showAll={showAll}
        updateList={updateList}
        message={setMsg}
      />
    </div>
  );
};

export default App;
