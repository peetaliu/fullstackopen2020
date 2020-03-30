import React from "react";
import serv from "../services/PersonsService";

const Person = props => {
  const handleDelete = () => {
    const msg = {
      type: "error",
      msg: `${props.person.name} was already been removed from database`
    };

    if (window.confirm(`Delete ${props.person.name}?`)) {
      serv
        .del(props.person.id)
        .then(serv.getAll())
        .then(props.updateList())
        .catch(e => {
          props.message(msg);
          setTimeout(() => {
            props.message(null);
          }, 5000);
          props.updateList();
        });
    }
  };

  return (
    <li>
      {props.person.name} {props.person.number}{" "}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default Person;
