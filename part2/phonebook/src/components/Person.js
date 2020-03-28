import React from 'react'
import serv from '../services/PersonsService'

const Person = (props) => {

  const handleDelete = () => {
    serv.del(props.person.id)
      .then(serv.getAll())
      .then(props.updateList())
}

  return (
      <li>{props.person.name} {props.person.number} <button onClick={handleDelete}>Delete</button></li>
  )
}

export default Person