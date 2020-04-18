import React from "react";
import Person from "./Person";
const Persons = (props) => {
  console.log("props persons", props.persons);
  const personsToShow = props.showAll
    ? props.persons
    : props.persons.filter(
        (p) =>
          p.name.toLowerCase().trim().includes(props.search.toLowerCase()) ||
          p.number.toLowerCase().trim().includes(props.search.toLowerCase())
      );
  const showNames = () =>
    personsToShow.map((p) => (
      <Person
        key={p.name}
        person={p}
        updateList={props.updateList}
        message={props.message}
      />
    ));

  return <div>{showNames()}</div>;
};

export default Persons;
