// import React, { useState } from 'react'
// import Note from './components/Note'

// const App = (props) => {
//   const [notes, setNotes] = useState(props.notes)
//   const [newNote, setNewNote] = useState('a new note...')
//   const [showAll, setShowAll] = useState(true)

//   const notesToShow = showAll
//     ? notes
//     : notes.filter(note => note.important)

//   const rows = () => notesToShow.map(note =>
//     <Note
//       key={note.id}
//       note={note}
//     />
//   )

//   const addNote = (e) => {
//       e.preventDefault()
//       const noteObject = {
//           content: newNote,
//           date: new Date().toISOString(),
//           important: Math.random() > 0.5,
//           id: notes.length + 1,
//       }

//       setNotes(notes.concat(noteObject))
//       setNewNote('')
//   }

//   const handleNoteChange = (e) => {
//       console.log(e.target.value)
//       setNewNote(e.target.value)
//   }

//   return (
//     <div>
//       <h1>Notes</h1>
//       <div>
//           <button onClick={()=>setShowAll(!showAll)}>
//               show {showAll ? 'important' : 'all'}
//           </button>
//       </div>
//       <ul>
//         {rows()}
//       </ul>
//       <form onSubmit={addNote}>
//           <input 
//             value={newNote}
//             onChange={handleNoteChange}
//           />
//           <button type="submit">save</button>
//       </form>
//     </div>
//   )
// }

// export default App

import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons] = useState([
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
      const personObj = {
        name: newName
      }
      setPersons(persons.concat(personObj))
      setNewName('')
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