import React from 'react'
import serv from '../services/PersonsService'

const PersonForm = props => {
  const allPersons = [...props.persons]
  const timeoutMsg = msgObj => {
    props.message(msgObj)
    setTimeout(() => {
      props.message(null)
    }, 5000)
  }
  const addName = e => {
    e.preventDefault()
    if (!props.newName.trim() || !props.newNumber.trim()) {
      window.alert('Text boxes cannot be empty')
    } else {
      const personObj = {
        name: props.newName,
        number: props.newNumber,
      }
      if (allPersons.some(p => p.name === props.newName)) {
        if (
          window.confirm(
            `${props.newName} already exists in the phonebook. Replace old number with new?`
          )
        ) {
          const id =
            allPersons[allPersons.findIndex(p => p.name === props.newName)].id
          serv
            .update(id, personObj)
            .then(() => props.updateList())
            .catch(error => {
              const msgObject = {
                type: 'error',
                msg: error.response.data,
              }
              timeoutMsg(msgObject)
            })
        }
      } else if (allPersons.some(p => p.number === props.newNumber)) {
        window.alert(
          `${props.newNumber} already exists in the phonebook. Please add a different number`
        )
      } else {
        serv
          .create(personObj)
          .then(res => {
            const msgObject = {
              type: 'success',
              msg: `Added ${props.newName}`,
            }
            props.setPersons(props.persons.concat(res.data))
            props.setNewName('')
            props.setNewNumber('')
            timeoutMsg(msgObject)
          })
          .catch(err => {
            const msgObject = {
              type: 'error',
              msg: err.response.data.error,
            }
            timeoutMsg(msgObject)
          })
      }
    }
  }

  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number:{' '}
        <input value={props.newNumber} onChange={props.handleNumChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
export default PersonForm
